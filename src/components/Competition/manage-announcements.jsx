import {useDashboardData} from "../../util/routes-data";
import {useState} from "react";

export const ManageAnnouncements = () => {
  const {currentContest} = useDashboardData();
  const [announcements, setAnnouncments] = useState(currentContest.announcements ?? []);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [announcementFormVisible, setAnnouncementFormVisible] = useState(false);

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  }

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    setAnnouncments([...announcements, newAnnouncement]);
    setNewAnnouncement("");
    setAnnouncementFormVisible(false);
  }

  const handleAnnouncementDelete = (index) => {
    setAnnouncments(announcements.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h2>Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index}>
              {announcement}
              <button onClick={() => handleAnnouncementDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {announcementFormVisible ? (
        <form onSubmit={handleAnnouncementSubmit}>
          <textarea value={newAnnouncement} onChange={handleAnnouncementChange}/>
          <button type="submit">Add</button>
        </form>
      ) : (
        <button onClick={() => setAnnouncementFormVisible(true)}>Add Announcement</button>
      )}
    </div>
  );
}