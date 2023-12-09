
export default function BlogExpand ({ blog, onMinimize }) {
    return (
        <div>
            Expanded Blog {blog.id}
            <button onClick={onMinimize}>X</button>
        </div>
    )
}