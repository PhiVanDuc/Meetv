import Markdown from "react-markdown";
import { Meeting } from "@/types/meeting";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import MeetingDetailTranscript from "@/app/(dashboard)/meetings/[id]/_components/transcript";

import ICONS from "@/consts/icons";

interface Props {
    data: Meeting
}

export default function MeetingDetailCompletedStatus({ data }: Props) {
    return (
        <Tabs
            defaultValue="summary"
            className="gap-y-[15px]"
        >
            <div className="overflow-x-auto overflow-y-hidden">
                <TabsList>
                    <TabsTrigger value="summary">
                        <ICONS.NOTE />
                        <span>Tóm tắt cuộc họp</span>
                    </TabsTrigger>

                    <TabsTrigger value="transcript">
                        <ICONS.TRANSCRIPT />
                        <span>Lời thoại cuộc họp</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="summary">
                <div className="p-[20px] rounded-[10px] border">
                    {
                        data.summary
                            ? (
                                <Markdown
                                    components={{
                                        h1: (props) => <h1 className="text-2xl font-medium mb-6" {...props} />,
                                        h2: (props) => <h2 className="text-xl font-medium mb-6" {...props} />,
                                        h3: (props) => <h3 className="text-lg font-medium mb-6" {...props} />,
                                        h4: (props) => <h4 className="text-base font-medium mb-6" {...props} />,
                                        p: (props) => <p className="mb-6 leading-relaxed" {...props} />,
                                        ul: (props) => <ul className="list-disc list-inside mb-6" {...props} />,
                                        ol: (props) => <ol className="list-decimal list-inside mb-6" {...props} />,
                                        li: (props) => <li className="mb-1" {...props} />,
                                        strong: (props) => <strong className="font-semibold" {...props} />,
                                        code: (props) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
                                        blockquote: (props) => <blockquote className="border-l-4 pl-4 italic my-4" {...props} />
                                    }}
                                >
                                    {data.summary}
                                </Markdown>
                            )
                            : <p>Tóm tắt cuộc họp không tồn tại.</p>
                    }
                </div>
            </TabsContent>

            <TabsContent value="transcript">
                <MeetingDetailTranscript id={data.id} />
            </TabsContent>
        </Tabs>
    )
}