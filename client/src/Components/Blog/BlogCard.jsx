export default function BlogCard ({ blog, onExpand }) {
    function handleClick() {
        onExpand(blog.id)
    }
    return (
        <div onClick={handleClick}>
            <h2>{blog.title}</h2>
        </div>
    )
}