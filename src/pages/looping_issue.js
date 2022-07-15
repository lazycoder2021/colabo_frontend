{
    docsforapproval.forEach((d) => {

        return (
            <div className="approverdoc">
                <p>{d.userId}</p>
                <p>{d.title}</p>
                <p>{d._id}</p>
            </div>
        )

    })
}
