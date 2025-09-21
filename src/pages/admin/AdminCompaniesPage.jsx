import { Button, Modal, Table, Form, Input, notification, Upload } from "antd"
import { Plus, Pen, Trash, UploadIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { useGetAllCompanies } from "../../hooks/company/useGetAllCompanies";
import { ConfigProvider, Pagination } from 'antd';
import { useCreateCompany } from "../../hooks/company/useCreateCompany";
import { useUpdateCompany } from "../../hooks/company/useUpdateCompany";
import useDeleteCompany from "../../hooks/company/useDeleteCompany";
import useGetPresignedUrl from "../../hooks/storage/useGetPresignedUrl";
import useUploadFileUsingPresignedUrl from "../../hooks/storage/useUploadFileUsingPresignedUrl";

const AdminCompaniesPage = () => {
    const [api, contextHolder] = notification.useNotification()
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentCompany, setCurrentCompany] = useState(null)
    const { data: companiesData } = useGetAllCompanies({ page: page - 1, pageSize: pageSize })
    const [form] = Form.useForm()
    const createCompanyMutation = useCreateCompany()
    const deleteCompanyMutation = useDeleteCompany()
    const updateCompanyMutation = useUpdateCompany()
    const getPresignedUrl = useGetPresignedUrl()
    const uploadFileUsingPresignedUrl = useUploadFileUsingPresignedUrl()

    const dataSource = companiesData?.content || []
    const totalCompanies = companiesData?.totalElements

    useEffect(() => {
        if (isEdit && currentCompany && showModal) {
            form.setFieldsValue({
                name: currentCompany.name,
                email: currentCompany.email,
                address: currentCompany.address,
                description: currentCompany.description
            });
        }
    }, [isEdit, currentCompany, showModal, form])

    const openNotification = (type, message, description) => {
        console.log('Open notification')
        api.open({
            message: message,
            description: description,
            type: type || 'info',
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'
        },
        {
            title: 'Total jobs',
            dataIndex: '',
            key: '',
            render: (company) => company.jobs.length
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2 w-11">
                    <Pen className="text-blue-500 cursor-pointer" onClick={() => { setIsEdit(true); setCurrentCompany(record); setShowModal(true) }} />
                    <Trash className="text-red-500 cursor-pointer" onClick={() => handleDelete(record.id)} />
                </div>
            ),
        }
    ]

    const handleDelete = async (id) => {
        try {
            await deleteCompanyMutation.mutateAsync(id)
            openNotification('success', 'Company Deleted', 'The company has been successfully deleted.')
        } catch {
            console.log('Delete Company Error')
            openNotification('error', 'Delete Failed', 'Failed to delete the company. Please try again.')
        }
    }

    const handleUploadLogo = async ({ company, logo }) => {
        try {
            const body = {
                folder: "company",
                fileName: company.id
            }
            const url = await getPresignedUrl.mutateAsync(body)
            await uploadFileUsingPresignedUrl.mutateAsync({ url, file: logo.originFileObj })
        } catch (error) {
            openNotification('error', 'Submit Failed', error.response.data.message)
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            const { logo, ...companyData } = values

            if (isEdit) {
                await updateCompanyMutation.mutateAsync({ companyId: currentCompany.id, companyData: companyData })
                if (logo) {
                    handleUploadLogo({ company: currentCompany, logo })
                }
                openNotification('success', 'Company Modified', 'Company information has been successfully modified.')
            } else {
                const newCompany = await createCompanyMutation.mutateAsync(companyData)
                if (logo) {
                    handleUploadLogo({ company: newCompany, logo })
                }
                openNotification('success', 'Company Created', 'The company has been successfully added.')
            }
            setShowModal(false)
            form.resetFields()
        } catch (error) {
            console.log('Submit Company Error:', error)
            openNotification('error', 'Submit Failed', error.response.data.message)
        }
    }

    return (
        <>
            {contextHolder}
            <div className="p-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Companies Management</h1>
                    <Button type="primary" onClick={() => {
                        setIsEdit(false);
                        setCurrentCompany(null);
                        setShowModal(true);
                    }}>
                        <Plus className="w-4" />
                        <p className="font-bold">Company</p>
                    </Button>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowKey="id"
                    />
                    <div className='mt-4'>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: 'black',
                                },
                            }}
                        >
                            <Pagination
                                align="center"
                                current={page}
                                onChange={(newPage) => setPage(newPage)}
                                total={totalCompanies}
                                pageSize={pageSize}
                                showSizeChanger={false}
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
            <Modal
                title={isEdit ? "Edit company information" : "Add a new company"}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                    if (isEdit) {
                        setIsEdit(false);
                        setCurrentCompany(null);
                    }
                }}
                onOk={handleSubmit}
            >
                <Form
                    form={form}
                >
                    <Form.Item
                        name="name"
                        layout="vertical"
                        label="Name"
                        rules={[{ required: true, message: 'Please select a company!' }]}
                    >
                        <Input placeholder="Enter company name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input placeholder="Enter company email" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please input the address!' }]}
                    >
                        <Input placeholder="Enter company address" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the company description!' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter company description"
                        />
                    </Form.Item>

                    <Form.Item
                        name="logo"
                        label="Logo"
                        valuePropName="file"
                        getValueFromEvent={(info) => {
                            return info?.fileList[0]
                        }}
                    >
                        <Upload
                            name="logo"
                            listType="picture"
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            <Button>
                                <UploadIcon className="w-4 h-auto" />
                                Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default AdminCompaniesPage
