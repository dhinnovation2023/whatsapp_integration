export const dynamic = "force-dynamic";
import { fetchAllStatus } from '@/functions/status/fetch-all'
import DashboardLayout from '@/layouts/dashboard'
import StatusListItem from './status-list-item';
import AddStatusForm from './add-status-form';
import { getBulkStatusChatCount } from '@/functions/status/get-bulk-status-chat-count';

const StatusSettingsPage = async () => {

    const statusList = await fetchAllStatus({ currentPage: 1 });
    const statusIdList: string[] = [];

    for (const status of statusList) {
        statusIdList.push(status.statusId);
    }

    const statusCountList = await getBulkStatusChatCount({ statusIdList });

    return (
        <DashboardLayout
            pageTitle='Status Settings'
        >
            <div
                className='w-full py-10'
            >
                <div
                    className='max-w-[500px] bg-background py-5 px-6 rounded-2xl mx-auto space-y-6'
                >

                    <div>
                        <AddStatusForm />
                    </div>

                    <div
                        className='space-y-2'
                    >
                        {
                            statusList.length === 0 && (
                                <div>
                                    No results found
                                </div>
                            )
                        }

                        {
                            statusList.map((item, index) => (
                                <StatusListItem
                                    key={index}
                                    item={{
                                        name: item.name,
                                        color: item.color,
                                        statusId: item.statusId,
                                        createdAt: item.createdAt,
                                        updatedAt: item.updatedAt,
                                    }}
                                    statusCount={
                                        statusCountList.find((countItem) => countItem.statusId === item.statusId)
                                            ?.count || 0
                                    }
                                />
                            ))
                        }

                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default StatusSettingsPage