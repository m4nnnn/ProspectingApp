function TextCard({ content }) {

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-3 h-11.5 flex items-center">
            <p className="font-medium text-sm text-black">{content}</p>
        </div>
    )
}

export default TextCard