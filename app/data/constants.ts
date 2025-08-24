import { College, Branch } from '../types'

export const colleges: College[] = [
  // Visakhapatnam Colleges
  { id: 'andhra-university', name: 'Andhra University', location: 'Visakhapatnam' },
  { id: 'gitam-university', name: 'GITAM University', location: 'Visakhapatnam' },
  { id: 'gvpce', name: 'Gayatri Vidya Parishad College Of Engineering (A)', location: 'Visakhapatnam' },
  { id: 'mvgr-college', name: 'MVGR College of Engineering', location: 'Visakhapatnam' },
  { id: 'vignan-university', name: 'Vignan University', location: 'Visakhapatnam' },
  { id: 'centurion-university', name: 'Centurion University', location: 'Visakhapatnam' },
  { id: 'anil-neerukonda', name: 'Anil Neerukonda Institute of Technology', location: 'Visakhapatnam' },
  { id: 'dhanekula', name: 'Dhanekula Institute of Engineering', location: 'Visakhapatnam' },
  { id: 'pragati-engineering', name: 'Pragati Engineering College', location: 'Visakhapatnam' },
  { id: 'srkr-engineering', name: 'SRKR Engineering College', location: 'Visakhapatnam' },
  
  // IITs
  { id: 'iit-bombay', name: 'IIT Bombay', location: 'Mumbai' },
  { id: 'iit-delhi', name: 'IIT Delhi', location: 'New Delhi' },
  { id: 'iit-madras', name: 'IIT Madras', location: 'Chennai' },
  { id: 'iit-kanpur', name: 'IIT Kanpur', location: 'Kanpur' },
  { id: 'iit-kharagpur', name: 'IIT Kharagpur', location: 'Kharagpur' },
  { id: 'iit-roorkee', name: 'IIT Roorkee', location: 'Roorkee' },
  { id: 'iit-guwahati', name: 'IIT Guwahati', location: 'Guwahati' },
  { id: 'iit-hyderabad', name: 'IIT Hyderabad', location: 'Hyderabad' },
  { id: 'iit-indore', name: 'IIT Indore', location: 'Indore' },
  { id: 'iit-mandi', name: 'IIT Mandi', location: 'Mandi' },
  { id: 'iit-gandhinagar', name: 'IIT Gandhinagar', location: 'Gandhinagar' },
  { id: 'iit-patna', name: 'IIT Patna', location: 'Patna' },
  { id: 'iit-ropar', name: 'IIT Ropar', location: 'Ropar' },
  { id: 'iit-bhubaneswar', name: 'IIT Bhubaneswar', location: 'Bhubaneswar' },
  { id: 'iit-jodhpur', name: 'IIT Jodhpur', location: 'Jodhpur' },
  { id: 'iit-varanasi', name: 'IIT (BHU) Varanasi', location: 'Varanasi' },
  { id: 'iit-palakkad', name: 'IIT Palakkad', location: 'Palakkad' },
  { id: 'iit-tirupati', name: 'IIT Tirupati', location: 'Tirupati' },
  { id: 'iit-dhanbad', name: 'IIT (ISM) Dhanbad', location: 'Dhanbad' },
  { id: 'iit-bhilai', name: 'IIT Bhilai', location: 'Bhilai' },
  { id: 'iit-goa', name: 'IIT Goa', location: 'Goa' },
  { id: 'iit-jammu', name: 'IIT Jammu', location: 'Jammu' },
  { id: 'iit-dharwad', name: 'IIT Dharwad', location: 'Dharwad' },
  
  // NITs
  { id: 'nit-trichy', name: 'NIT Tiruchirappalli', location: 'Tiruchirappalli' },
  { id: 'nit-warangal', name: 'NIT Warangal', location: 'Warangal' },
  { id: 'nit-surathkal', name: 'NIT Karnataka (Surathkal)', location: 'Surathkal' },
  { id: 'nit-rourkela', name: 'NIT Rourkela', location: 'Rourkela' },
  { id: 'nit-kurukshetra', name: 'NIT Kurukshetra', location: 'Kurukshetra' },
  { id: 'nit-jamshedpur', name: 'NIT Jamshedpur', location: 'Jamshedpur' },
  { id: 'nit-calicut', name: 'NIT Calicut', location: 'Calicut' },
  { id: 'nit-durgapur', name: 'NIT Durgapur', location: 'Durgapur' },
  { id: 'nit-allahabad', name: 'NIT Allahabad', location: 'Allahabad' },
  { id: 'nit-bhopal', name: 'NIT Bhopal', location: 'Bhopal' },
  { id: 'nit-nagpur', name: 'NIT Nagpur', location: 'Nagpur' },
  { id: 'nit-hamirpur', name: 'NIT Hamirpur', location: 'Hamirpur' },
  { id: 'nit-jalandhar', name: 'NIT Jalandhar', location: 'Jalandhar' },
  { id: 'nit-patna', name: 'NIT Patna', location: 'Patna' },
  { id: 'nit-raipur', name: 'NIT Raipur', location: 'Raipur' },
  { id: 'nit-agartala', name: 'NIT Agartala', location: 'Agartala' },
  { id: 'nit-arunachal', name: 'NIT Arunachal Pradesh', location: 'Yupia' },
  { id: 'nit-delhi', name: 'NIT Delhi', location: 'New Delhi' },
  { id: 'nit-goa', name: 'NIT Goa', location: 'Goa' },
  { id: 'nit-manipur', name: 'NIT Manipur', location: 'Imphal' },
  { id: 'nit-meghalaya', name: 'NIT Meghalaya', location: 'Shillong' },
  { id: 'nit-mizoram', name: 'NIT Mizoram', location: 'Aizawl' },
  { id: 'nit-nagaland', name: 'NIT Nagaland', location: 'Dimapur' },
  { id: 'nit-puducherry', name: 'NIT Puducherry', location: 'Puducherry' },
  { id: 'nit-sikkim', name: 'NIT Sikkim', location: 'Ravangla' },
  { id: 'nit-srinagar', name: 'NIT Srinagar', location: 'Srinagar' },
  { id: 'nit-uttarakhand', name: 'NIT Uttarakhand', location: 'Srinagar' },
  { id: 'nit-andhra', name: 'NIT Andhra Pradesh', location: 'Tadepalligudem' },
  
  // Other Popular Colleges
  { id: 'vit-ap', name: 'VIT-AP University', location: 'Amaravati' },
  { id: 'srm-ap', name: 'SRM University AP', location: 'Amaravati' },
  { id: 'bits-pilani', name: 'BITS Pilani', location: 'Pilani' },
  { id: 'bits-goa', name: 'BITS Goa', location: 'Goa' },
  { id: 'bits-hyderabad', name: 'BITS Hyderabad', location: 'Hyderabad' },
  { id: 'iiit-hyderabad', name: 'IIIT Hyderabad', location: 'Hyderabad' },
  { id: 'iiit-bangalore', name: 'IIIT Bangalore', location: 'Bangalore' },
  { id: 'dtu', name: 'Delhi Technological University', location: 'New Delhi' },
  { id: 'nsit', name: 'Netaji Subhas University of Technology', location: 'New Delhi' },
  { id: 'jadavpur-university', name: 'Jadavpur University', location: 'Kolkata' }
]

export const BRANCHES: Branch[] = [
  { code: 'CSE', name: 'Computer Science Engineering' },
  { code: 'IT', name: 'Information Technology' },
  { code: 'ECE', name: 'Electronics & Communication Engineering' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering' },
  { code: 'MECH', name: 'Mechanical Engineering' },
  { code: 'CIVIL', name: 'Civil Engineering' },
  { code: 'CHEM', name: 'Chemical Engineering' },
  { code: 'AERO', name: 'Aeronautical Engineering' },
  { code: 'AUTO', name: 'Automobile Engineering' },
  { code: 'BIO', name: 'Biotechnology' }
]

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']

export const VIZAG_COLLEGES = colleges.filter(college => 
  college.location.toLowerCase().includes('visakhapatnam')
)

export const SKILLS = [
  'Programming', 'Web Development', 'Mobile Development', 'Data Science',
  'Machine Learning', 'AI', 'Cloud Computing', 'DevOps', 'Cybersecurity',
  'UI/UX Design', 'Digital Marketing', 'Project Management', 'Database Management',
  'System Design', 'Networking', 'Blockchain', 'IoT', 'Robotics',
  'Game Development', 'AR/VR', 'Photography', 'Video Editing'
]

export const INTERESTS = [
  'Technology', 'Science', 'Mathematics', 'Physics', 'Chemistry',
  'Biology', 'History', 'Literature', 'Art', 'Music', 'Sports',
  'Travel', 'Cooking', 'Gaming', 'Reading', 'Writing', 'Dancing',
  'Singing', 'Fitness', 'Yoga', 'Meditation', 'Environment'
]
