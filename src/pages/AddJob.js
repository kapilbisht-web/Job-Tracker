import JobParser from '../components/JobParser';

const AddJob = () => {
  const handleExtractedData = (parsed) => {
    console.log('Parsed job:', parsed);
    // You can auto-fill form fields here:
    // setForm({ ...form, role: parsed.role, company: parsed.company, location: parsed.location });
  };

  return (
    <div>
      <h2>Add New Job</h2>
      <JobParser onExtract={handleExtractedData} />
      {/* Your job form goes here */}
    </div>
  );
};

export default AddJob;