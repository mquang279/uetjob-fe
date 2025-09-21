import { Button, Modal, Table, Form, Input, Select, DatePicker, InputNumber, Switch, notification } from "antd"
import { Plus, Pen, Trash } from 'lucide-react';
import { useGetAllJobs } from "../../hooks/job/useGetAllJobs";
import { useEffect, useState } from "react";
import { useGetAllCompanies } from "../../hooks/company/useGetAllCompanies";
import { useCreateJob } from "../../hooks/job/useCreateJob";
import { ConfigProvider, Pagination } from 'antd';
import useDeleteJob from "../../hooks/job/useDeleteJob";
import dayjs from 'dayjs';
import { useUpdateJob } from "../../hooks/job/useUpdateJob";
import { useGetAllSkills } from "../../hooks/skill/useGetAllSkills";
import { useCreateSkill } from "../../hooks/skill/useCreateSkill";

const AdminJobsPage = () => {
    const [api, contextHolder] = notification.useNotification()
    const pageSize = 10
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentJob, setCurrentJob] = useState(null)
    const { data } = useGetAllJobs({ page: page - 1, pageSize })
    const { data: companiesData } = useGetAllCompanies({ page: 0, pageSize: 100 })
    const { data: skillsData } = useGetAllSkills()
    const [form] = Form.useForm()
    const createJobMutation = useCreateJob()
    const deleteJobMutation = useDeleteJob()
    const updateJobMutation = useUpdateJob()
    const createSkillMutation = useCreateSkill()

    const jobCount = data?.totalElements
    const dataSource = data?.content || []
    const companies = companiesData?.content || []
    const skills = skillsData?.content || []

    useEffect(() => {
        console.log(currentJob)
    }, [currentJob])

    useEffect(() => {
        if (isEdit && currentJob && showModal) {
            form.setFieldsValue({
                title: currentJob.title,
                companyId: currentJob.company.id,
                location: currentJob.location,
                description: currentJob.description,
                skills: currentJob.skills.map((skill) => skill.id),
                minSalary: currentJob.minSalary,
                maxSalary: currentJob.maxSalary,
                endDate: currentJob.endDate ? dayjs(currentJob.endDate) : null,
                quantity: currentJob.quantity,
                level: currentJob.level,
                candidateLevel: currentJob.candidateLevel,
                jobType: currentJob.jobType,
                active: currentJob.active
            });
        } else if (!isEdit && showModal) {
            form.setFieldsValue({
                title: '',
                companyId: undefined,
                location: '',
                description: '',
                skills: [],
                minSalary: undefined,
                maxSalary: undefined,
                endDate: null,
                quantity: 1,
                level: 'FRESHER',
                candidateLevel: undefined,
                jobType: undefined,
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

            const jobSkills = values.skills
            values.skills = jobSkills.map((skillId) => {
                return {
                    id: skillId
                }
            })

            const { companyId, ...jobData } = values

            console.log(jobData)
            if (isEdit) {
                await updateJobMutation.mutateAsync({ companyId, jobId: currentJob.id, jobData })
            } else {
                await createJobMutation.mutateAsync({ companyId, jobData })
            }
            setShowModal(false)
            form.resetFields()
        } catch (error) {
            openNotification('error', 'Create job failed', `Failed to create the job: ${error.message}`)
        }
    }

    return (
        <>
            {contextHolder}
            <div className="p-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Jobs Management</h1>
                    <Button type="primary" onClick={() => {
                        setIsEdit(false);
                        setCurrentJob(null);
                        setShowModal(true);
                    }}>
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
                title={isEdit ? "Edit job information" : "Add a new job"}
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
                        <Select
                            placeholder="Select a company"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
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

                    <Form.Item
                        name="candidateLevel"
                        label="Candidate Level"
                        rules={[{ required: true, message: 'Please select candidate level!' }]}
                    >
                        <Select placeholder="Select candidate level">
                            <Select.Option value="NHAN_VIEN">Nhân viên</Select.Option>
                            <Select.Option value="NHOM_TRUONG">Nhóm trưởng</Select.Option>
                            <Select.Option value="TRUONG_PHONG">Trưởng phòng</Select.Option>
                            <Select.Option value="PHO_GIAM_DOC">Phó Giám đốc</Select.Option>
                            <Select.Option value="GIAM_DOC">Giám đốc</Select.Option>
                            <Select.Option value="OTHER">Khác</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="jobType"
                        label="Job type"
                        rules={[{ required: true, message: 'Please select job type!' }]}
                    >
                        <Select
                            placeholder="Select job type"
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="FULL_TIME">Full time</Select.Option>
                            <Select.Option value="PART_TIME">Part time</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="skills"
                        label="Skills"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select skills or type to add new"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{ width: '100%' }}
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const inputValue = e.target.value.trim();
                                    if (inputValue && !skills.includes(inputValue)) {
                                        try {
                                            await createSkillMutation.mutateAsync({ name: inputValue });
                                            openNotification('success', 'Skill Created', `"${inputValue}" has been added to skills.`);
                                            e.target.value = '';
                                        } catch {
                                            openNotification('error', 'Skill Creation Failed', `Failed to create skill "${inputValue}".`);
                                        }
                                    }
                                }
                            }}
                        >
                            {skills.map((skill, index) => (
                                <Select.Option key={index} value={skill.id}>{skill.name}</Select.Option>
                            ))}
                        </Select>
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


                    <Form.Item
                        name="active"
                        label="Active Status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default AdminJobsPage
