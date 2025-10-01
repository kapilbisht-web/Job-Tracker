// client/src/pages/Dashboard.jsx
import { useNavigate,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../api';
import '../styles/dashboard.css';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const navigate = useNavigate();
  const companies = ['Google', 'Amazon', 'Infosys', 'TCS', 'Flipkart', 'Zomato', 'Microsoft', 'Adobe', 'Paytm', 'Swiggy'];
  const jobTitles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Software Engineer', 'Product Manager', 'UI/UX Designer', 'QA Analyst', 'DevOps Engineer', 'Data Scientist', 'Mobile App Developer', 'Technical Support Engineer', 'Business Analyst'];
  const sources = ['LinkedIn', 'Naukri', 'Company Website', 'Referral', 'Indeed', 'Other'];

  const [job, setJob] = useState({ company: '', position: '', status: 'Applied', source: '' });
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const statusIcons = {
    Applied: '📄',
    Interview: '📅',
    Offer: '✅',
    Rejected: '❌',
  };

  const fetchJobs = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.token) return navigate('/login');

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      const res = await axiosInstance.get(`/api/jobs?page=${page}&limit=5&search=${search}&status=${filter}`, config);
      setJobs((prev) => {
        const newJobs = res.data.jobs.filter((j) => !prev.some((p) => p._id === j._id));
        return [...prev, ...newJobs];
      });
      setHasMore(jobs.length + res.data.jobs.length < res.data.total);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setJobs([]);
    setPage(1);
  }, [search, filter]);

  const handleLogout = () => navigate('/logout');

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job.company.trim() || !job.position.trim()) {
      toast.error('Company and Position are required');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      let res;
      if (job._id) {
        res = await axiosInstance.put(`/api/jobs/${job._id}`, job, config);
        toast.success('Job updated');
      } else {
        res = await axiosInstance.post('/api/jobs', job, config);
        toast.success('Job added');
      }

      setJobs((prev) => {
        const exists = prev.some((j) => j._id === res.data._id);
        return exists ? prev : [res.data, ...prev];
      });

      setJob({ company: '', position: '', status: 'Applied', source: '' });
    } catch (err) {
      toast.error('Failed to save job');
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      await axiosInstance.delete(`/api/jobs/${id}`, config);
      setJobs(jobs.filter((j) => j._id !== id));
      toast.success('Job deleted');
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  const handleEdit = (jobToEdit) => {
    setJob({
      company: jobToEdit.company,
      position: jobToEdit.position,
      status: jobToEdit.status,
      source: jobToEdit.source,
      _id: jobToEdit._id,
    });
    setJobs(jobs.filter((j) => j._id !== jobToEdit._id));
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' || j.status === filter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    Applied: jobs.filter((j) => j.status === 'Applied').length,
    Interview: jobs.filter((j) => j.status === 'Interview').length,
    Offer: jobs.filter((j) => j.status === 'Offer').length,
    Rejected: jobs.filter((j) => j.status === 'Rejected').length,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
  <h2>Welcome to Job Tracker Dashboard</h2>
  <p>Track your job applications, filter them, and view stats.</p>
  <Link to="profile" className="profile-link">Go to Profile</Link> {/* ✅ Fixed */}
</header>

      <form onSubmit={handleSubmit} className="job-form">
        <input list="company-list" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} required />
        <datalist id="company-list">
          {companies.map((c) => <option key={c} value={c} />)}
        </datalist>

        <input list="position-list" name="position" placeholder="Role / Position" value={job.position} onChange={handleChange} required />
        <datalist id="position-list">
          {jobTitles.map((title) => <option key={title} value={title} />)}
        </datalist>

        <select name="status" value={job.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <select name="source" value={job.source} onChange={handleChange} required>
          <option value="">Select Source</option>
          {sources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <br />
        <button type="submit">{job._id ? 'Update Job' : 'Add Job'}</button>
      </form>

      <div className="dashboard-filters">
        <input type="text" placeholder="Search by company or role" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="job-list">
        <h3>Filtered Results</h3>
        {filteredJobs.length === 0 ? (
          <p>No matching jobs found.</p>
        ) : (
          filteredJobs.map((j) => (
            <div key={j._id} className="job-card">
              <h4>{j.company}</h4>
              <p>Role: {j.position}</p>
              <p>Status: {statusIcons[j.status]} {j.status}</p>
              <div className="job-actions">
                <button onClick={() => handleEdit(j)}>Edit</button>
                <button onClick={() => handleDelete(j._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
        {hasMore && (
          <button className="load-more-btn" onClick={() => setPage(page + 1)}>
            Load More
          </button>
        )}
      </div>

      <div className="job-stats">
        <h3>📊 Application Stats</h3>
        <p>Applied: {stats.Applied}</p>
        <p>Interview: {stats.Interview}</p>
        <p>Offer: {stats.Offer}</p>
        <p>Rejected: {stats.Rejected}</p>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;