export type AssignmentDocsProps = {
    openDocTitle: string;
    openDocText: string;
    isDocLoading: boolean;
    closeDocumentation: () => void;
}

export const AssignmentDocs = ({ openDocTitle, openDocText, isDocLoading, closeDocumentation }: AssignmentDocsProps) => {
    return (
        <div
                    className="fixed top-14 bottom-50 right-0 left-0 z-40 bg-gray/45 backdrop-blur-sm p-4"
                    onClick={closeDocumentation}
                >
                    <div
                        className="mx-auto h-full w-full max-w-4xl rounded-2xl border-2 border-tangerine/50 bg-gray/95 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-tangerine/40 px-4 py-3">
                            <h2 className="text-lg font-semibold text-silver">{openDocTitle} Documentation</h2>
                            <button
                                onClick={closeDocumentation}
                                className="rounded-md bg-cyan px-3 py-1 text-silver hover:cursor-pointer hover:bg-tangerine"
                            >
                                Close
                            </button>
                        </div>
                        <div className="h-[calc(100%-3.25rem)] overflow-y-auto px-4 py-3">
                            {isDocLoading ? (
                                <p className="text-silver">Loading documentation...</p>
                            ) : (
                                <pre className="whitespace-pre-wrap text-sm text-silver">{openDocText}</pre>
                            )}
                        </div>
                    </div>
                </div>
    )
}