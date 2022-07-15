function Releasenotes() {
    return (
        <div className="stats-container">
            <h2 className="releaseHeader">Release Notes</h2>

            <ul>
                <li>The idea was to create a simple CRUD record which traverses through 4 status(es), namely: inprogress, under_review, pending_approval and completed. </li>
                <li>The app itself represents a simple document collaboration tool which allows: writers to write docs, reviewers to review the written docs and approvers to approve the reviewed docs. </li>
                <li>The default user can only write/read/update/delete the docs . To review (or approve) the written doc, one needs dbuser permission.</li>
                <div className="gap"></div>
                <li><b>How the app works:</b></li>
                <li>Once you login/register as a user and create the doc and assign it 'under_review' status, the doc will appear on the reviewer screen. </li>
                <li>Reviewer has to provide his comments + click add review button to add review to the doc. </li>
                <li>Once the doc is reviewed and the status is changed to 'pending_approval', the approver will be able to see the doc and approve the same</li>
                <li>Every status change is basically handled via an api call so that the user (with the appropriate role) gets to know of it via his dashboard</li>
                <div className="gap"></div>
                <li><b>Regarding Backend Code</b></li>
                <li>Every api call authorizes the user (via decryption of jwt tokens the user profile carries) and then checks for their role (which also is encrypted using jwt tokens when the user logs in, and then is passed to fulfill the appropriate request upon decryption)  </li>
                <li>A very simple authentication middleware is present (in every api call) that executes the above task</li>
                <li>JWT tokens are stored in localstorage, not using cookies. Guess this can be replaced by sessions with some effort.</li>
                <li>Some query parameters (of backend routes) were hardcoded. Like, for example, to get a specific document from a list of documents. </li>

                <div className="gap"></div>
                <li><b>Regarding Data Model</b></li>
                <li>As for data model, document id is passed to review model (for review comments) and approve model (for approver comments) to fetch review and approver comments belonging to a doc</li>
                <li>And user id is passed to the document model, to distinguish records based on user who created them.</li>

                <div className="gap"></div>
                <li><b>Regarding Dashboard Views</b></li>
                <li>The docs are queried for the required status (depending on whether it is reviewer or approver screen) and their length is displayed as number on the dashboard</li>
                <li>As for the list view within dashboard, only those records that need action are queried for and displayed. Naturally when the required action takes place, the record is removed off the screen and the dashboard data gets modified accordingly.</li>


                <div className="gap"></div>
                <li><b>Regarding Frontend</b></li>
                <li>Getting used to using react routing. Working with both path and query parameters was a lot easier this time.</li>
                <li>Keeping the design minimal, so that focus is on understanding react related logic.</li>
                <li>Record Edit/Update screen functionality is an improvement over previous ones. Still i am retaining/displaying the recording details only as a placeholder text, because i am not yet sure how to modify the state of the input/textarea field, once its value is fixed based on the fetched record. As the values are not retained, You have rewrite each and every field, otherwise the field would be updated as empty.</li>
                <li>React icons npm package was used to add those simple dashboard icons</li>
                <div className="gap"></div>
                <li><b>Further Enhancements</b></li>
                <li>Allowing writers to upload their files.</li>
                <li>Sending mails to reviewers/approvers when a doc is submitted.</li>
                <li>Assigning functionality for reviewing and approving docs [for now anyone with the designated role can take action]</li>
                <li>Linking dashboard numbers with (and displaying) the respective/actual data</li>
                <li>Handling -ve doc lifecycle too. Like what happens when reviewer rejects a doc or approver rejects a doc. A back-and-forth conversation thread between writer/reviewer etc</li>
                <li>Allowing writers to share their files while updating its status to 'under_review'</li>
                <li>Introduce simple versioning system for the documents being written</li>
                <li>And More...</li>
            </ul>
        </div>
   )
}

export default Releasenotes;
