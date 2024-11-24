type SectionProps = {
    title: string;
    content: string;
};

function Section({ title, content }: SectionProps) {
    return (
        <div className="w-full flex-1 mt-16">
            <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    {title}
                </div>
            </div>
            <div className="my-12 text-center">
                <div className="px-2 inline-block text-lg text-blue-600 tracking-wide font-medium bg-white whitespace-pre-line">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Section; 