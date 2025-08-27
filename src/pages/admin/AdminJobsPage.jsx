import { Button, Modal, Table, Form, Input, Select, DatePicker, InputNumber, Switch, notification } from "antd"
import { Plus, Pen, Trash } from 'lucide-react';
import { useGetAllJobs } from "../../hooks/job/useGetAllJobs";
import { useEffect, useState } from "react";
import { useJobsCount } from "../../hooks/job/useJobsCount";
import { useGetAllCompanies } from "../../hooks/company/useGetAllCompanies";
import { useCreateJob } from "../../hooks/job/useCreateJob";
import { ConfigProvider, Pagination } from 'antd';
import useDeleteJob from "../../hooks/job/useDeleteJob";

const AdminJobsPage = () => {
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const { data: jobCount } = useJobsCount()
    const { data } = useGetAllJobs({ page: page - 1, pageSize })
    const { data: companiesData } = useGetAllCompanies({ page: 0, pageSize: 100 })
    const [form] = Form.useForm()
    const createJobMutation = useCreateJob()
    const deleteJobMutation = useDeleteJob()

    const dataSource = data?.content || []
    const companies = companiesData?.content || []

    useEffect(() => {
        console.log(showModal)
    }, [showModal])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (company) => company?.name || 'N/A'
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Add date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'
        },
        {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (endDate) => endDate ? new Date(endDate).toLocaleDateString() : 'N/A'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (
                <span className={`px-2 py-1 rounded-full text-xs ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {active ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2 w-11">
                    <Pen className="text-blue-500 cursor-pointer" onClick={() => console.log(record)} />
                    <Trash className="text-red-500 cursor-pointer" onClick={() => handleDeleteJob({ companyId: record.company.id, jobId: record.id })} />
                </div>
            ),
        }
    ];

    const handleDeleteJob = async ({ companyId, jobId }) => {
        try {
            await deleteJobMutation.mutateAsync({ companyId, jobId })
        } catch {
            console.log('Delete Job Error')
        }
    }

    const handleCreateJob = async () => {
        try {
            const values = await form.validateFields();
            if (values.startDate) values.startDate = values.startDate.format("YYYY-MM-DD HH:mm:ss");
            if (values.endDate) values.endDate = values.endDate.format("YYYY-MM-DD HH:mm:ss");

            const { companyId, ...jobData } = values;
            await createJobMutation.mutateAsync({ companyId, jobData });
            setShowModal(false);
            form.resetFields();
        } catch {
            console.log('Add Job Error')
        }
    };

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Jobs Management</h1>
                    <Button type="primary" onClick={() => setShowModal(true)}>
                        <Plus className="w-4" />
                        <p className="font-bold">Job</p>
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
                title="Add a new job"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={showModal}
                onCancel={() => { setShowModal(false); form.resetFields(); }}
                onOk={handleCreateJob}
            >
                <Form
                    form={form}
                    initialValues={{
                        active: true,
                        quantity: 1,
                        level: 'FRESHER'
                    }}
                >
                    <Form.Item
                        name="title"
                        layout="vertical"
                        label="Title"
                        rules={[{ required: true, message: 'Please select a company!' }]}
                    >
                        <Input placeholder="Enter job title" />
                    </Form.Item>

                    <Form.Item
                        name="companyId"
                        label="Company"
                        rules={[{ required: true, message: 'Please select a company!' }]}
                    >
                        <Select placeholder="Select a company">
                            {companies.map(company => (
                                <Select.Option key={company.id} value={company.id}>
                                    {company.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please input the location!' }]}
                    >
                        <Input placeholder="Enter job location" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the job description!' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter job description"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="minSalary"
                            label="Minimum Salary"
                        >
                            <InputNumber
                                placeholder="Min salary"
                                className="w-full"
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="maxSalary"
                            label="Maximum Salary"
                        >
                            <InputNumber
                                placeholder="Max salary"
                                className="w-full"
                                min={0}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="endDate"
                        label="End Date"
                    >
                        <DatePicker
                            className="w-full"
                            format="YYYY-MM-DD"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="quantity"
                            label="Number of Positions"
                        >
                            <InputNumber
                                placeholder="Quantity"
                                className="w-full"
                                min={1}
                            />
                        </Form.Item>

                        <Form.Item
                            name="level"
                            label="Job Level"
                        >
                            <Select placeholder="Select job level">
                                <Select.Option value="INTERN">Intern</Select.Option>
                                <Select.Option value="FRESHER">Fresher</Select.Option>
                                <Select.Option value="JUNIOR">Junior</Select.Option>
                                <Select.Option value="MIDDLE">Middle</Select.Option>
                                <Select.Option value="SENIOR">Senior</Select.Option>
                                <Select.Option value="LEAD">Lead</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>


                </Form>
            </Modal>
        </>

    )
}

export default AdminJobsPage
