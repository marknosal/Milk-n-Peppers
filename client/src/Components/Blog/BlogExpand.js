
export default function BlogExpand ({ blog, onMinimize }) {
    console.log(blog)
    return (
        <div>
            <h2>{blog.title}</h2>
            <button onClick={() => onMinimize()}>X</button>
        </div>
    )
}