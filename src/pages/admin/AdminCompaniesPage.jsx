import { Button, Modal, Table, Form, Input, Select, DatePicker, InputNumber, Switch, notification } from "antd"
import { Plus, Pen, Trash } from 'lucide-react';
import { useGetAllJobs } from "../../hooks/job/useGetAllJobs";
import { useEffect, useState } from "react";
import { useJobsCount } from "../../hooks/job/useJobsCount";
import { useGetAllCompanies } from "../../hooks/company/useGetAllCompanies";
import { useCreateJob } from "../../hooks/job/useCreateJob";
import { ConfigProvider, Pagination } from 'antd';
import useDeleteJob from "../../hooks/job/useDeleteJob";
import dayjs from 'dayjs';
import { useUpdateJob } from "../../hooks/job/useUpdateJob";

const AdminCompaniesPage = () => {
    const [api, contextHolder] = notification.useNotification()
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const { data: jobCount } = useJobsCount()
    const [currentJob, setCurrentJob] = useState(null)
    const { data } = useGetAllJobs({ page: page - 1, pageSize })
    const { data: companiesData } = useGetAllCompanies({ page: 0, pageSize: 100 })
    const [form] = Form.useForm()
    const createJobMutation = useCreateJob()
    const deleteJobMutation = useDeleteJob()
    const updateJobMutation = useUpdateJob()

    const dataSource = companiesData?.content || []
    const companies = companiesData?.content || []

    useEffect(() => {
        console.log(showModal)
    }, [showModal])

    useEffect(() => {
        if (isEdit && currentJob && showModal) {
            form.setFieldsValue({
                title: currentJob.title,
                companyId: currentJob.company.id,
                location: currentJob.location,
                description: currentJob.description,
                minSalary: currentJob.minSalary,
                maxSalary: currentJob.maxSalary,
                endDate: currentJob.endDate ? dayjs(currentJob.endDate) : null,
                quantity: currentJob.quantity,
                level: currentJob.level,
                active: currentJob.active
            });
        } else if (!isEdit && showModal) {
            form.setFieldsValue({
                title: '',
                companyId: undefined,
                location: '',
                description: '',
                minSalary: undefined,
                maxSalary: undefined,
                endDate: null,
                quantity: 1,
                level: 'FRESHER',
                active: true
            });
        }
    }, [isEdit, currentJob, showModal, form])

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
                    <Pen className="text-blue-500 cursor-pointer" onClick={() => { setIsEdit(true); setCurrentJob(record); setShowModal(true) }} />
                    <Trash className="text-red-500 cursor-pointer" onClick={() => handleDeleteJob({ companyId: record.company.id, jobId: record.id })} />
                </div>
            ),
        }
    ]

    const handleDeleteJob = async ({ companyId, jobId }) => {
        try {
            await deleteJobMutation.mutateAsync({ companyId, jobId })
            openNotification('success', 'Job Deleted', 'The job has been successfully deleted.')
        } catch {
            console.log('Delete Job Error')
            openNotification('error', 'Delete Failed', 'Failed to delete the job. Please try again.')
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            if (values.startDate) values.startDate = values.startDate.format("YYYY-MM-DD HH:mm:ss")
            if (values.endDate) values.endDate = values.endDate.format("YYYY-MM-DD HH:mm:ss")

            const { companyId, ...jobData } = values
            if (isEdit) {
                await updateJobMutation.mutateAsync({ companyId, jobId: currentJob.id, jobData })
            } else {
                await createJobMutation.mutateAsync({ companyId, jobData })
            }
            setShowModal(false)
            form.resetFields()
        } catch {
            console.log('Submit Job Error')
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
                        setCurrentJob(null);
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
                                total={jobCount}
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
                        setCurrentJob(null);
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
                </Form>
            </Modal>
        </>

    )
}

export default AdminCompaniesPage
