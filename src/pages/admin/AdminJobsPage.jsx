import { Button } from "antd"
import { Plus } from 'lucide-react';

const AdminJobsPage = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Jobs Management</h1>
                <Button type="primary">
                    <Plus className="w-4" />
                    <p className="font-bold">Job</p>
                </Button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                Job
            </div>
        </div>
    )
}

export default AdminJobsPage
