import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Settings as SettingsIcon,
  Layout,
  Grid,
  LogOut,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Search,
  Eye,
  ExternalLink,
  Calendar,
  Tag,
  Palette,
  Trophy,
  Users,
  Zap,
  Upload,
  Bell,
  Mail as MailIcon,
  MessageCircle as MsgIcon,
  Check,
  Clock
} from 'lucide-react';
import logo from './images/download.png';

const AdminPortal = ({ onLogout, refreshData }) => {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingItem, setViewingItem] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, msg: '', action: null });
  const [successDialog, setSuccessDialog] = useState({ isOpen: false, msg: '' });
  // Content States
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [stories, setStories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(null);

  // Form/Edit States
  const [editingItem, setEditingItem] = useState(null);
  const [newService, setNewService] = useState({ title: '', description: '', icon: '📋', category: 'General', tags: '', color: 'rgba(16, 185, 129, 0.1)', isActive: true, showOnHome: false });
  const [newBanner, setNewBanner] = useState({ title: '', imageUrl: '', order: 0, isActive: true });
  const [newPortfolio, setNewPortfolio] = useState({ title: '', description: '', imageUrl: '', category: 'Project', link: '', tags: '', isActive: true });

  useEffect(() => {
    if (token) { fetchInitialData(); }
  }, [token]);

  const fetchInitialData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const ts = Date.now();
      const [bRes, sRes, setRes, pRes, stRes, inquiriesRes] = await Promise.all([
        fetch(`/api/admin/banners?t=${ts}`, { headers }).then(res => res.json()),
        fetch(`/api/admin/services?t=${ts}`, { headers }).then(res => res.json()),
        fetch(`/api/public/settings?t=${ts}`).then(res => res.json()),
        fetch(`/api/admin/portfolio?t=${ts}`, { headers }).then(res => res.json()),
        fetch(`/api/admin/stories?t=${ts}`, { headers }).then(res => res.json()),
        fetch(`/api/admin/inquiries?t=${ts}`, { headers }).then(res => res.json())
      ]);
      setBanners(Array.isArray(bRes) ? bRes : []);
      setServices(Array.isArray(sRes) ? sRes : []);
      setSettings(setRes);
      setPortfolios(Array.isArray(pRes) ? pRes : []);
      setStories(Array.isArray(stRes) ? stRes : []);
      setInquiries(Array.isArray(inquiriesRes) ? inquiriesRes : []);
    } catch (err) {
      showStatus('error', 'Failed to fetch dashboard data');
    }
  };

  const showStatus = (type, msg) => {
    setStatus({ type, msg });
    setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('adminToken', data.token);
        setToken(data.token);
        showStatus('success', 'Logged in successfully');
      } else { setError(data.message || 'Login Failed'); }
    } catch (err) { setError('Connection Error'); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    if (onLogout) onLogout();
  };

  const apiAction = (endpoint, method, body) => {
    let confirmMsg = "Are you sure you want to proceed with this action?";
    if (method === 'DELETE') confirmMsg = "Are you sure you want to delete this item? This action cannot be undone.";
    else if (method === 'POST') confirmMsg = "Are you sure you want to publish this new item to the live website?";
    else if (method === 'PUT') confirmMsg = "Are you sure you want to save these changes to the live website?";

    setConfirmDialog({
      isOpen: true,
      msg: confirmMsg,
      action: async () => {
        setConfirmDialog({ isOpen: false, msg: '', action: null });
        try {
          const res = await fetch(`/api/admin${endpoint}`, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : null
          });
          if (res.ok) {
            showStatus('success', 'Operation successful');

            // Build custom success message
            let successMsg = "Changes saved successfully!";
            const itemName = body?.title || 'Item';
            if (method === 'POST') successMsg = `Your ${endpoint.includes('portfolio') ? 'portfolio project' : 'service'} "${itemName}" has been successfully registered!`;
            else if (method === 'PUT') successMsg = `Changes to "${itemName}" have been successfully saved!`;
            else if (method === 'DELETE') successMsg = `Item has been successfully deleted from the website.`;

            setSuccessDialog({ isOpen: true, msg: successMsg });

            await fetchInitialData();
            if (refreshData) refreshData();
            setEditingItem(null);
            return true;
          } else {
            const data = await res.json();
            showStatus('error', data.message || 'Action failed');
            return false;
          }
        } catch (err) {
          showStatus('error', 'Network error');
          return false;
        }
      }
    });
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showStatus('success', 'Inquiry marked as read');
        await fetchInitialData();
      }
    } catch (err) {
      showStatus('error', 'Failed to update inquiry');
    }
  };

  const handleFileUpload = async (file, callback) => {
    if (!file) return;

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showStatus('error', 'File too large. Max 10MB allowed.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ image: base64, name: file.name })
        });
        if (res.ok) {
          const data = await res.json();
          callback(data.url);
          showStatus('success', 'Image uploaded successfully!');
        } else {
          showStatus('error', 'Upload failed');
        }
      } catch (err) {
        showStatus('error', 'Network error during upload');
      }
    };
  };

  const handleSeed = async () => {
    const defaultData = {
      services: [
        { title: "Online Reputation management", description: "It is also known as corporate reputation Management. We understand the value of online reputation.", icon: "📋", category: "Digital Marketing", isActive: true, showOnHome: true },
        { title: "Social Media Marketing Services", description: "DevSpectra Social media marketing services are designed to integrate the existing campaign with your social media campaign.", icon: "📱", category: "Digital Marketing", isActive: true, showOnHome: true },
        { title: "Search Engine Optimization", description: "Our strategies can help you to dominate search results. We make sure that your website ranks at the top and leads come in.", icon: "🔍", category: "Digital Marketing", isActive: true, showOnHome: true },
        { title: "Web and Traffic Analytics", description: "Looking for Web Analysis for better business? Rely on us. In DevSpectra Web Analytics services we cover on web,social and mobile analytics.", icon: "📊", category: "Digital Marketing", isActive: true, showOnHome: true },
        { title: "Frontend Development", description: "We build responsive and innovative user interfaces using modern technologies.", icon: "💻", category: "Web Development", isActive: true, showOnHome: true },
        { title: "Backend Development", description: "We develop secure and scalable server-side applications and APIs.", icon: "⚙️", category: "Web Development", isActive: true, showOnHome: true },
        { title: "Custom B2C Stores", description: "Tailored online shopping experiences designed to convert visitors.", icon: "🛍️", category: "E-Commerce", isActive: true, showOnHome: false },
        { title: "App Store Optimization", description: "Maximize your app's visibility and conversion rates in Apple and Google Play stores.", icon: "📈", category: "Digital Marketing", isActive: true, showOnHome: false },
        { title: "QA & Manual Testing", description: "Rigorous quality assurance to ensure your software is bug-free and performant.", icon: "🧪", category: "General", isActive: true, showOnHome: false }
      ],
      portfolios: [
        { title: "Furniture Store", category: "Web Development", description: "Modern e-commerce website with shopping cart and payment gateway.", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Analytics Dashboard", category: "Web Development", description: "Real-time analytics dashboard for business insights and reports.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Corporate Website", category: "Web Development", description: "Professional business website with modern design and animations.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Restaurant Website", category: "Web Development", description: "Restaurant website with online menu and table reservation.", imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600", isActive: true },

        { title: "Global Retail Store", category: "E-Commerce", description: "Multi-currency e-commerce platform with automated inventory.", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Fashion Boutique", category: "E-Commerce", description: "Luxury fashion store with custom filtering and seamless checkout.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "B2B Wholesale Portal", category: "E-Commerce", description: "Bulk ordering system with tiered pricing and account management.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", isActive: true },

        { title: "SaaS Growth Campaign", category: "Digital Marketing", description: "Comprehensive SEO and PPC campaign increasing ARR by 150%.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Social Viral Strategy", category: "Digital Marketing", description: "Organic social media campaign reaching 5M+ targeted users.", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Local SEO Dominance", category: "Digital Marketing", description: "Hyper-local SEO strategy dominating local map packs and search.", imageUrl: "https://images.unsplash.com/photo-1432888117247-f82ad31dddb2?auto=format&fit=crop&q=80&w=600", isActive: true },

        { title: "Fintech Dashboard", category: "UI/UX", description: "Intuitive financial analytics dashboard designed for enterprise clients.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Health App UI", category: "UI/UX", description: "Clean and accessible mobile app interface for patient care.", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Crypto Exchange UI", category: "UI/UX", description: "Modern trading interface with real-time data visualization.", imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=600", isActive: true },

        { title: "Fitness Tracking App", category: "Mobile App", description: "Personalized workout and diet tracking app with real-time analytics.", imageUrl: "https://images.unsplash.com/photo-1526502781454-d8f99e82939c?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Food Delivery App", category: "Mobile App", description: "Seamless food ordering and real-time delivery tracking platform.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600", isActive: true },
        { title: "Telemedicine App", category: "Mobile App", description: "Secure video consultations and health record management.", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600", isActive: true }
      ]
    };

    if (confirm("This will add default projects and services to your database. Continue?")) {
      try {
        const res = await fetch('/api/admin/seed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(defaultData)
        });
        if (res.ok) {
          showStatus('success', 'Default content seeded successfully!');
          fetchInitialData();
          if (refreshData) refreshData();
        } else {
          const errData = await res.json();
          showStatus('error', `Seeding failed: ${errData.message || 'Unknown error'}`);
        }
      } catch (err) {
        showStatus('error', 'Connection Error');
      }
    }
  };

  const filteredItems = (items) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.title?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.client?.toLowerCase().includes(query) ||
      item.result?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.story?.toLowerCase().includes(query)
    );
  };

  if (!token) {
    return (
      <div className="login-screen">
        <div className="login-backdrop"></div>
        <div className="login-box">
          <div className="login-card-inner">
            <div className="brand-badge">SECURE ACCESS</div>
            <img src={logo} alt="Logo" className="login-logo" />
            <h2>DevSpectra <span className="text-gradient">Admin</span></h2>
            <p>Enter your credentials to manage the digital ecosystem.</p>

            <form onSubmit={handleLogin}>
              {error && <div className="error-alert"><AlertCircle size={16} /> {error}</div>}
              <div className="input-group">
                <label>Admin ID</label>
                <div className="input-with-icon">
                  <Users size={18} className="field-icon" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter admin id" />
                </div>
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Zap size={18} className="field-icon" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
              </div>
              <button type="submit" className="login-btn">
                <span>AUTHORIZE ACCESS</span>
                <Plus size={18} />
              </button>
            </form>
          </div>
        </div>
        <style>{`
          .login-screen { height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; position: relative; }
          .login-backdrop { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.05) 0%, transparent 50%); }
          .login-box { width: 100%; max-width: 480px; padding: 20px; position: relative; z-index: 1; }
          .login-card-inner { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 60px 45px; border-radius: 40px; text-align: center; box-shadow: 0 50px 100px rgba(0,0,0,0.4); }
          .brand-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 6px 16px; border-radius: 50px; font-size: 10px; font-weight: 800; letter-spacing: 2px; display: inline-block; margin-bottom: 25px; border: 1px solid rgba(16, 185, 129, 0.2); }
          .login-logo { height: 80px; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3)); }
          .login-card-inner h2 { font-size: 36px; font-weight: 900; margin-bottom: 12px; color: white; letter-spacing: -1px; }
          .login-card-inner p { color: #94a3b8; margin-bottom: 40px; font-size: 15px; font-weight: 500; }
          .input-group { text-align: left; margin-bottom: 25px; }
          .input-group label { display: block; font-size: 12px; font-weight: 800; color: #10b981; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1.5px; }
          .input-with-icon { position: relative; }
          .field-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #64748b; transition: 0.3s; }
          .input-group input { width: 100%; padding: 18px 18px 18px 50px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; font-size: 15px; color: white; transition: 0.3s; }
          .input-group input:focus { outline: none; border-color: #10b981; background: rgba(255, 255, 255, 0.08); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
          .input-group input:focus + .field-icon { color: #10b981; }
          .login-btn { width: 100%; background: #10b981; color: white; border: none; padding: 20px; border-radius: 20px; font-weight: 800; cursor: pointer; margin-top: 20px; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 14px; letter-spacing: 1px; }
          .login-btn:hover { background: #059669; transform: translateY(-3px); box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3); }
          .error-alert { background: rgba(239, 68, 68, 0.1); color: #f87171; padding: 16px; border-radius: 16px; margin-bottom: 30px; font-size: 14px; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(239, 68, 68, 0.2); font-weight: 600; }
          .text-gradient { background: linear-gradient(135deg, #10b981, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header"><img src={logo} alt="Logo" className="admin-sidebar-logo" /></div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}><Grid size={20} /> Services</button>
          <button className={activeTab === 'portfolio' ? 'active' : ''} onClick={() => setActiveTab('portfolio')}><Briefcase size={20} /> Portfolio</button>
          <button className={activeTab === 'stories' ? 'active' : ''} onClick={() => setActiveTab('stories')}><Trophy size={20} /> Impact Stories</button>
          <button className={activeTab === 'inquiries' ? 'active' : ''} onClick={() => setActiveTab('inquiries')}><MailIcon size={20} /> Inquiries {inquiries.filter(i => i.status === 'unread').length > 0 && <span className="unread-dot">{inquiries.filter(i => i.status === 'unread').length}</span>}</button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><SettingsIcon size={20} /> Settings</button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}><LogOut size={20} /> Sign Out</button>
      </aside>

      <main className="content">
        <header className="content-header">
          <div className="header-left"><span>Welcome back, Administrator</span><h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Hub</h2></div>
          <div className="header-right">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search across all modules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="notif-bell-container" onClick={() => setActiveTab('inquiries')}>
              <Bell size={22} />
              {inquiries.filter(i => i.status === 'unread').length > 0 && (
                <span className="notif-badge">{inquiries.filter(i => i.status === 'unread').length}</span>
              )}
            </div>
            {status.msg && <div className={"status-toast " + status.type}>{status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}{status.msg}</div>}
          </div>
        </header>


        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card"><div className="stat-icon s"><Grid size={24} /></div><div className="stat-info"><h4>{services.filter(s => s.isActive !== false).length}/{services.length}</h4><span>Services </span></div></div>
          <div className="stat-card"><div className="stat-icon p"><Briefcase size={24} /></div><div className="stat-info"><h4>{portfolios.filter(p => p.isActive !== false).length}/{portfolios.length}</h4><span>Projects </span></div></div>
          <div className="stat-card"><div className="stat-icon t"><Trophy size={24} /></div><div className="stat-info"><h4>{stories.filter(s => s.isActive !== false).length}/{stories.length}</h4><span>Stories </span></div></div>
          <div className="stat-card"><div className="stat-icon m" style={{background: '#fef3c7', color: '#d97706'}}><MailIcon size={24} /></div><div className="stat-info"><h4>{inquiries.filter(i => i.status === 'unread').length} New</h4><span>Messages </span></div></div>
        </div>

        <div className="scroll-container">

          {activeTab === 'services' && (
            <div className="tab-pane">
              <div className="action-card">
                <h3>{editingItem?.type === 'service' ? 'Modify Service' : 'Launch New Service'}</h3>
                <div className="form-row">
                  <div className="input-field"><label>Service Title</label><input type="text" value={editingItem?.type === 'service' ? editingItem.data.title : newService.title} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } }) : setNewService({ ...newService, title: e.target.value })} /></div>
                  <div className="input-field"><label>Icon (Emoji)</label><input type="text" value={editingItem?.type === 'service' ? editingItem.data.icon : newService.icon} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, icon: e.target.value } }) : setNewService({ ...newService, icon: e.target.value })} /></div>
                  <div className="input-field"><label>Category</label>
                    <select value={editingItem?.type === 'service' ? editingItem.data.category : newService.category} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } }) : setNewService({ ...newService, category: e.target.value })}>
                      <option>Digital Marketing</option><option>Web Development</option><option>Mobile App</option><option>UI/UX</option><option>E-Commerce</option><option>General</option>
                    </select>
                  </div>
                  <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                    <input type="checkbox" checked={editingItem?.type === 'service' ? editingItem.data.isActive : newService.isActive} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, isActive: e.target.checked } }) : setNewService({ ...newService, isActive: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                    <label style={{ marginBottom: 0 }}>Visible on Website</label>
                  </div>
                  <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                    <input type="checkbox" checked={editingItem?.type === 'service' ? editingItem.data.showOnHome : newService.showOnHome} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, showOnHome: e.target.checked } }) : setNewService({ ...newService, showOnHome: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                    <label style={{ marginBottom: 0 }}>Show on Home Page</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-field full"><label>Tags (Comma separated)</label><input type="text" value={editingItem?.type === 'service' ? (editingItem.data.tags || '') : newService.tags} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, tags: e.target.value } }) : setNewService({ ...newService, tags: e.target.value })} placeholder="React, Node.js, AWS" /></div>
                </div>
                <div className="input-field full"><label>Service Description</label><textarea value={editingItem?.type === 'service' ? editingItem.data.description : newService.description} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } }) : setNewService({ ...newService, description: e.target.value })} /></div>
                <div className="btn-row">
                  {editingItem ? (
                    <><button className="save-btn" onClick={() => apiAction(`/services/${editingItem.data.id}`, 'PUT', editingItem.data)}><Save size={18} /> Update Service</button><button className="cancel-btn" onClick={() => setEditingItem(null)}><X size={18} /> Cancel</button></>
                  ) : (
                    <button className="primary-btn" onClick={() => apiAction('/services', 'POST', newService) && setNewService({ title: '', description: '', icon: '📋', category: 'General', showOnHome: false, isActive: true })}><Plus size={18} /> Register Service</button>
                  )}
                </div>
              </div>
              <div className="list-view accordion-view">
                {Array.from(new Set(['Digital Marketing', 'Web Development', 'Mobile App', 'UI/UX', 'E-Commerce', ...services.map(s => s.category || 'General')])).map(cat => {
                  const isExpanded = expandedCategory === cat;
                  const catServices = filteredItems(services).filter(s => (s.category || 'General') === cat);

                  return (
                    <div key={cat} className="category-accordion-box">
                      <div className="category-header" onClick={() => setExpandedCategory(isExpanded ? null : cat)}>
                        <h4>{cat}</h4>
                        <div className="cat-counts">
                          <span className="count-badge service-badge">{catServices.length} Services</span>
                          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="category-body">
                          {catServices.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#64748b', padding: '10px' }}>No services currently assigned to this category.</p>
                          ) : (
                            <div className="cat-items-grid">
                              {catServices.map(s => (
                                <div key={s.id} className="list-item nested-item">
                                  <div className="list-icon">{s.icon}</div>
                                  <div className="list-info">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <h5>{s.title}</h5>
                                      <span className={`status-tag ${s.isActive === false ? 'inactive' : 'active'}`}>
                                        {s.isActive === false ? 'Hidden' : 'Live'}
                                      </span>
                                      {s.showOnHome && (
                                        <span className="status-tag active" style={{ background: '#fef2f2', color: '#ef4444', borderColor: '#fecaca' }}>
                                          Home Page
                                        </span>
                                      )}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '8px 0' }}>
                                      <span className="info-pill cat">{s.category}</span>
                                      {(s.tags || '').split(',').filter(t => t.trim()).map((tag, idx) => (
                                        <span key={idx} className="info-pill tag">{tag.trim()}</span>
                                      ))}
                                    </div>
                                    <p style={{ fontSize: '13px', lineHeight: '1.4' }}>{s.description}</p>
                                  </div>
                                  <div className="list-actions">
                                    <button className="view-btn" onClick={() => setViewingItem({ type: 'service', data: s })}><Eye size={18} /></button>
                                    <button className="ed-btn" onClick={() => setEditingItem({ type: 'service', data: s })}><Edit size={18} /></button>
                                    <button className="del-btn" onClick={() => apiAction(`/services/${s.id}`, 'DELETE')}><Trash2 size={18} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="tab-pane">
              <div className="action-card">
                <h3>{editingItem?.type === 'portfolio' ? 'Update Project' : 'Publish Portfolio Project'}</h3>
                <div className="form-row">
                  <div className="input-field"><label>Project Name</label><input type="text" value={editingItem?.type === 'portfolio' ? editingItem.data.title : newPortfolio.title} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } }) : setNewPortfolio({ ...newPortfolio, title: e.target.value })} /></div>
                  <div className="input-field"><label>Category</label>
                    <select value={editingItem?.type === 'portfolio' ? editingItem.data.category : newPortfolio.category} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } }) : setNewPortfolio({ ...newPortfolio, category: e.target.value })}>
                      <option>Digital Marketing</option><option>Web Development</option><option>Mobile App</option><option>UI/UX</option><option>E-Commerce</option><option>General</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label>Image URL (or browse)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" value={editingItem?.type === 'portfolio' ? editingItem.data.imageUrl : newPortfolio.imageUrl} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, imageUrl: e.target.value } }) : setNewPortfolio({ ...newPortfolio, imageUrl: e.target.value })} style={{ flex: 1 }} />
                      <button className="view-btn" style={{ padding: '0 15px' }} onClick={() => document.getElementById('portfolio-file').click()}><Upload size={18} /></button>
                      <input type="file" id="portfolio-file" hidden accept="image/*" onChange={e => handleFileUpload(e.target.files[0], (url) => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, imageUrl: url } }) : setNewPortfolio({ ...newPortfolio, imageUrl: url }))} />
                    </div>
                  </div>
                  <div className="input-field"><label>Tags (Comma separated)</label><input type="text" value={editingItem?.type === 'portfolio' ? (editingItem.data.tags || '') : newPortfolio.tags} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, tags: e.target.value } }) : setNewPortfolio({ ...newPortfolio, tags: e.target.value })} placeholder="UI/UX, Branding, 2024" /></div>
                  <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                    <input type="checkbox" checked={editingItem?.type === 'portfolio' ? editingItem.data.isActive : newPortfolio.isActive} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, isActive: e.target.checked } }) : setNewPortfolio({ ...newPortfolio, isActive: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                    <label style={{ marginBottom: 0 }}>Visible on Website</label>
                  </div>
                </div>
                <div className="input-field full"><label>Project Description</label><textarea value={editingItem?.type === 'portfolio' ? editingItem.data.description : newPortfolio.description} onChange={e => editingItem ? setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } }) : setNewPortfolio({ ...newPortfolio, description: e.target.value })} /></div>
                <div className="btn-row">
                  {editingItem ? (
                    <><button className="save-btn" onClick={() => apiAction(`/portfolio/${editingItem.data.id}`, 'PUT', editingItem.data)}><Save size={18} /> Save Changes</button><button className="cancel-btn" onClick={() => setEditingItem(null)}><X size={18} /> Cancel</button></>
                  ) : (
                    <button className="primary-btn" onClick={() => apiAction('/portfolio', 'POST', newPortfolio) && setNewPortfolio({ title: '', description: '', imageUrl: '', category: 'Project', link: '', tags: '', isActive: true })}><Plus size={18} /> Upload Project</button>
                  )}
                </div>
              </div>
              <div className="list-view accordion-view">
                {Array.from(new Set(['Digital Marketing', 'Web Development', 'Mobile App', 'UI/UX', 'E-Commerce', ...portfolios.map(p => p.category || 'General')])).map(cat => {
                  const isExpanded = expandedCategory === cat;
                  const catPortfolios = filteredItems(portfolios).filter(p => (p.category || 'General') === cat);

                  return (
                    <div key={cat} className="category-accordion-box">
                      <div className="category-header" onClick={() => setExpandedCategory(isExpanded ? null : cat)}>
                        <h4>{cat}</h4>
                        <div className="cat-counts">
                          <span className="count-badge port-badge">{catPortfolios.length} Projects</span>
                          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="category-body">
                          {catPortfolios.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#64748b', padding: '10px' }}>No portfolios currently assigned to this category.</p>
                          ) : (
                            <div className="cat-items-grid">
                              {catPortfolios.map(p => (
                                <div key={p.id} className="list-item nested-item">
                                  <div className="list-icon" style={{ padding: 0, overflow: 'hidden' }}><img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                                  <div className="list-info">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <h5>{p.title}</h5>
                                      <span className={`status-tag ${p.isActive === false ? 'inactive' : 'active'}`}>
                                        {p.isActive === false ? 'Hidden' : 'Live'}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '8px 0' }}>
                                      <span className="info-pill cat">{p.category}</span>
                                      {(p.tags || '').split(',').filter(t => t.trim()).map((tag, idx) => (
                                        <span key={idx} className="info-pill tag">{tag.trim()}</span>
                                      ))}
                                    </div>
                                    <p style={{ fontSize: '13px', lineHeight: '1.4' }}>{p.description}</p>
                                  </div>
                                  <div className="list-actions">
                                    <button className="view-btn" onClick={() => setViewingItem({ type: 'portfolio', data: p })}><Eye size={18} /></button>
                                    <button className="ed-btn" onClick={() => setEditingItem({ type: 'portfolio', data: p })}><Edit size={18} /></button>
                                    <button className="del-btn" onClick={() => apiAction(`/portfolio/${p.id}`, 'DELETE')}><Trash2 size={18} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="tab-pane">
              {editingItem?.type === 'story' && (
                <div className="action-card">
                  <h3>Edit Success Story</h3>
                  <div className="form-row">
                    <div className="input-field"><label>Client Name</label><input type="text" value={editingItem.data.client} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, client: e.target.value } })} /></div>
                    <div className="input-field"><label>Impact/Result (e.g. 200% Growth)</label><input type="text" value={editingItem.data.result} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, result: e.target.value } })} /></div>
                    <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                      <input type="checkbox" checked={editingItem.data.isActive} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, isActive: e.target.checked } })} style={{ width: '20px', height: '20px' }} />
                      <label style={{ marginBottom: 0 }}>Visible on Website (Published)</label>
                    </div>
                    <div className="input-field">
                      <label>Client Photo (or browse)</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" value={editingItem.data.clientImage} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, clientImage: e.target.value } })} style={{ flex: 1 }} />
                        <button className="view-btn" style={{ padding: '0 15px' }} onClick={() => document.getElementById('story-file').click()}><Upload size={18} /></button>
                        <input type="file" id="story-file" hidden accept="image/*" onChange={e => handleFileUpload(e.target.files[0], (url) => setEditingItem({ ...editingItem, data: { ...editingItem.data, clientImage: url } }))} />
                      </div>
                    </div>
                  </div>
                  <div className="input-field full"><label>Story Detail</label><textarea value={editingItem.data.story} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, story: e.target.value } })} /></div>
                  <div className="btn-row">
                    <button className="save-btn" onClick={() => apiAction(`/stories/${editingItem.data.id}`, 'PUT', editingItem.data)}><Save size={18} /> Update & Publish Story</button>
                    <button className="cancel-btn" onClick={() => setEditingItem(null)}><X size={18} /> Cancel</button>
                  </div>
                </div>
              )}
              <div className="list-view">
                {filteredItems(stories).map(s => (
                  <div key={s.id} className="list-item">
                    <div className="list-icon" style={{ background: '#f0fdf4', overflow: 'hidden', padding: 0 }}>
                      {s.clientImage ? (
                        <img src={s.clientImage} alt={s.client} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: '#10b981' }}>
                          {s.client?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="list-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h5>{s.client}</h5>
                        <span className="info-pill cat" style={{ background: '#dcfce7', color: '#166534' }}>{s.result}</span>
                        <span className={`status-tag ${s.isActive === false ? 'inactive' : 'active'}`}>{s.isActive === false ? 'Hidden' : 'Live'}</span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{s.story.split('⚙')[0]}</p>
                        {s.story.includes('⚙') && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                            {s.story.split('⚙').slice(1).map((point, idx) => (
                              <span key={idx} className="info-pill tag" style={{ fontSize: '11px', background: '#f0f9ff', color: '#0369a1', border: '1px solid #e0f2fe' }}>{point.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="list-actions">
                      <button className="view-btn" onClick={() => setViewingItem({ type: 'story', data: s })} title="View Details"><Eye size={18} /></button>
                      {s.isActive === false && (
                        <button className="ed-btn" style={{ background: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5' }} onClick={() => apiAction(`/stories/${s.id}`, 'PUT', { ...s, isActive: true })} title="Approve & Publish"><Check size={18} /></button>
                      )}
                      <button className="del-btn" onClick={() => apiAction(`/stories/${s.id}`, 'DELETE')} title="Delete Story"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'inquiries' && (
            <div className="tab-pane">
              <div className="list-view">
                {filteredItems(inquiries).length === 0 ? (
                  <div style={{textAlign: 'center', padding: '100px 0', background: 'white', borderRadius: '30px'}}>
                    <MsgIcon size={64} color="#e2e8f0" style={{marginBottom: '20px'}} />
                    <h3>No inquiries found</h3>
                    <p style={{color: '#64748b'}}>Your inbox is clean or no items match your search!</p>
                  </div>
                ) : (
                  filteredItems(inquiries).map(item => (
                    <div key={item.id} className={`list-item inquiry-card ${item.status}`}>
                      <div className="list-icon" style={{background: item.type === 'quote' ? '#fdf2f8' : '#eff6ff', color: item.type === 'quote' ? '#db2777' : '#3b82f6'}}>
                        {item.type === 'quote' ? <Trophy size={24} /> : <MailIcon size={24} />}
                      </div>
                      <div className="list-info">
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
                          <h5 style={{margin: 0}}>{item.name}</h5>
                          <span className={`status-tag ${item.type}`}>{item.type.toUpperCase()}</span>
                          {item.status === 'unread' && <span className="status-tag active">NEW</span>}
                          <span style={{marginLeft: 'auto', fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <Clock size={12} /> {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div style={{display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '13px', color: '#475569'}}>
                          <span><strong>Email:</strong> {item.email}</span>
                          {item.phone && <span><strong>Phone:</strong> {item.phone}</span>}
                          {item.service && <span><strong>Interest:</strong> {item.service}</span>}
                        </div>
                        <p style={{fontSize: '14px', color: '#1e293b', background: '#f8fafc', padding: '15px', borderRadius: '12px', border: '1px solid #f1f5f9'}}>
                          {item.message}
                        </p>
                      </div>
                      <div className="list-actions">
                        <button className="view-btn" onClick={() => setViewingItem({ type: 'inquiry', data: item })} title="View Details"><Eye size={18} /></button>
                        {item.status === 'unread' ? (
                          <button className="ed-btn" style={{padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '5px', height: 'fit-content'}} onClick={() => markAsRead(item.id)} title="Mark as Read">
                            <CheckCircle size={18} /> Read
                          </button>
                        ) : (
                          <span className="read-status" style={{color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', fontSize: '13px'}}>
                            <CheckCircle size={18} /> Read
                          </span>
                        )}
                        <button className="del-btn" onClick={() => apiAction(`/admin/inquiries/${item.id}`, 'DELETE')} title="Delete Inquiry"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && settings && (
            <div className="tab-pane">
              <div className="settings-container">
                <div className="settings-header"><h3>General Site Configuration</h3><p>Manage your public contact info and brand assets</p></div>
                <div className="settings-grid">
                  <div className="setting-box"><label>Company Site Name</label><input type="text" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} /></div>
                  <div className="setting-box"><label>Corporate Email</label><input type="text" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} /></div>
                  <div className="setting-box"><label>Public Phone Line</label><input type="text" value={settings.contactPhone} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} /></div>
                  <div className="setting-box full"><label>Office HQ Address</label><textarea value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} /></div>
                </div>
                <button className="save-settings-btn" onClick={() => apiAction('/settings', 'PUT', settings)}><Save size={20} /> Update Live Settings</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail View Modal */}
      {viewingItem && (
        <div className="modal-overlay" onClick={() => setViewingItem(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-top-brand">
              <img src={logo} alt="DevSpectra Logo" className="modal-logo-small" />
              <span className="modal-brand-name">DevSpectra</span>
            </div>
            <button className="close-modal" onClick={() => setViewingItem(null)}><X size={24} /></button>
            <div className="modal-header">
              <span className="badge">{viewingItem.type.toUpperCase()}</span>
              <h2>{viewingItem.type === 'story' ? viewingItem.data.client : (viewingItem.type === 'inquiry' ? viewingItem.data.name : viewingItem.data.title)}</h2>
            </div>
            <div className="modal-content">
              {viewingItem.data.imageUrl && <img src={viewingItem.data.imageUrl} alt="Preview" className="modal-img" />}
              <div className="modal-info-grid">
                {(viewingItem.data.description || viewingItem.data.story || viewingItem.data.message) && (
                  <div className="info-block full">
                    <h3>{viewingItem.type === 'story' ? 'Success Story' : (viewingItem.type === 'inquiry' ? 'Inquiry Message' : 'Description')}</h3>
                    <p style={{marginBottom: viewingItem.data.story?.includes('⚙') ? '20px' : '0'}}>
                      {(viewingItem.data.description || viewingItem.data.story || viewingItem.data.message || '').split('⚙')[0]}
                    </p>
                    {viewingItem.type === 'story' && viewingItem.data.story?.includes('⚙') && (
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                        {viewingItem.data.story.split('⚙').slice(1).map((pt, i) => (
                          <span key={i} className="info-pill tag" style={{padding: '5px 12px', fontSize: '12px'}}>{pt.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {viewingItem.type === 'inquiry' && (
                  <>
                    <div className="info-block"><div className="info-label"><Mail size={14} /> Email Address</div><p>{viewingItem.data.email}</p></div>
                    {viewingItem.data.phone && <div className="info-block"><div className="info-label"><Phone size={14} /> Phone Number</div><p>{viewingItem.data.phone}</p></div>}
                    {viewingItem.data.service && <div className="info-block"><div className="info-label"><Tag size={14} /> Interest</div><p>{viewingItem.data.service}</p></div>}
                  </>
                )}
                {viewingItem.data.category && <div className="info-block"><div className="info-label"><Tag size={14} /> Category</div><p>{viewingItem.data.category}</p></div>}
                {viewingItem.data.result && <div className="info-block"><div className="info-label"><Trophy size={14} /> Impact Result</div><p>{viewingItem.data.result}</p></div>}
                {viewingItem.data.tags && <div className="info-block full"><div className="info-label"><Tag size={14} /> Tags</div><p>{viewingItem.data.tags}</p></div>}
                {viewingItem.data.color && <div className="info-block"><div className="info-label"><Palette size={14} /> Brand Color</div><p>{viewingItem.data.color}</p></div>}
                {viewingItem.data.order !== undefined && <div className="info-block"><div className="info-label"><Layout size={14} /> Sort Order</div><p>{viewingItem.data.order}</p></div>}
                {viewingItem.data.link && <div className="info-block"><div className="info-label"><ExternalLink size={14} /> Live Link</div><a href={viewingItem.data.link} target="_blank" rel="noreferrer">Visit Website</a></div>}
                <div className="info-block"><div className="info-label"><Calendar size={14} /> Created At</div><p>{new Date(viewingItem.data.createdAt).toLocaleDateString()}</p></div>
              </div>
            </div>
            <div className="modal-footer">
              {viewingItem.type === 'story' && viewingItem.data.isActive === false && (
                <button className="save-btn" style={{ marginRight: 'auto' }} onClick={async () => {
                  const success = await apiAction(`/stories/${viewingItem.data.id}`, 'PUT', { ...viewingItem.data, isActive: true });
                  if (success) setViewingItem(null);
                }}>
                  <CheckCircle size={18} /> APPROVE & PUBLISH
                </button>
              )}
              <button className="modal-close-btn" onClick={() => setViewingItem(null)}>CLOSE VIEW</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="modal-overlay">
          <div className="custom-popup">
            <div className="popup-icon warning"><AlertCircle size={32} /></div>
            <h3>Confirmation Required</h3>
            <p>{confirmDialog.msg}</p>
            <div className="popup-actions">
              <button className="cancel-btn" onClick={() => setConfirmDialog({ isOpen: false, msg: '', action: null })}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDialog.action}>Yes, Proceed</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Success Dialog */}
      {successDialog.isOpen && (
        <div className="modal-overlay" onClick={() => setSuccessDialog({ isOpen: false, msg: '' })}>
          <div className="custom-popup" onClick={e => e.stopPropagation()}>
            <div className="popup-icon success"><CheckCircle size={32} /></div>
            <h3>Success!</h3>
            <p>{successDialog.msg}</p>
            <button className="primary-btn mt-4" onClick={() => setSuccessDialog({ isOpen: false, msg: '' })}>Awesome</button>
          </div>
        </div>
      )}

      <style>{`
        .dashboard { display: flex; height: 100vh; background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; }
        .sidebar { width: 300px; background: #020617; color: white; padding: 40px 30px; display: flex; flex-direction: column; box-shadow: 10px 0 30px rgba(0,0,0,0.05); }
        .sidebar-header { margin-bottom: 60px; display: flex; justify-content: center; }
        .admin-sidebar-logo { height: 80px; width: auto; object-fit: contain; }
        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .sidebar-nav button { background: none; border: none; color: #94a3b8; padding: 16px 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .sidebar-nav button.active { background: #10b981; color: white; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
        .sidebar-nav button:hover:not(.active) { color: white; background: rgba(255,255,255,0.05); }
        .logout-btn { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171; padding: 16px; border-radius: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700; cursor: pointer; margin-top: auto; transition: 0.3s; }
        .logout-btn:hover { background: #ef4444; color: white; }

        .content { flex: 1; padding: 50px 60px; display: flex; flex-direction: column; overflow: hidden; }
        .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .header-left span { font-size: 14px; color: #64748b; font-weight: 600; }
        .header-left h2 { font-size: 36px; font-weight: 800; letter-spacing: -1.5px; margin-top: 5px; }
        .header-right { display: flex; align-items: center; gap: 20px; }
        .search-bar { background: white; padding: 12px 20px; border-radius: 50px; display: flex; align-items: center; gap: 12px; border: 1px solid #e2e8f0; width: 300px; }
        .search-bar input { border: none; outline: none; font-size: 14px; width: 100%; font-weight: 600; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 40px; }
        .stat-card { background: white; padding: 25px; border-radius: 30px; display: flex; align-items: center; gap: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid #f1f5f9; }
        .stat-icon { width: 55px; height: 55px; border-radius: 18px; display: flex; align-items: center; justify-content: center; }
        .stat-icon.b { background: #eff6ff; color: #3b82f6; }
        .stat-icon.s { background: #ecfdf5; color: #10b981; }
        .stat-icon.p { background: #fefce8; color: #eab308; }
        .stat-icon.t { background: #fdf2f8; color: #db2777; }
        .stat-info h4 { font-size: 24px; font-weight: 800; line-height: 1; }
        .stat-info span { font-size: 13px; color: #64748b; font-weight: 600; }

        .scroll-container { flex: 1; overflow-y: auto; padding-right: 15px; }
        .action-card { background: white; padding: 40px; border-radius: 35px; border: 1px solid #f1f5f9; margin-bottom: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .action-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 30px; color: #10b981; }
        .form-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 25px; }
        .input-field label { display: block; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
        .input-field input, .input-field select, .input-field textarea { width: 100%; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; font-size: 14px; transition: 0.3s; }
        .input-field textarea { height: 100px; resize: none; }
        .primary-btn { width: 100%; background: #10b981; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .btn-row { display: flex; gap: 15px; margin-top: 10px; }
        .save-btn { flex: 1; background: #10b981; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .cancel-btn { background: #f1f5f9; color: #64748b; border: none; padding: 18px 30px; border-radius: 18px; font-weight: 700; cursor: pointer; }

        .data-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
        .item-card { background: white; border-radius: 30px; overflow: hidden; border: 1px solid #f1f5f9; position: relative; transition: 0.3s; }
        .item-card img { width: 100%; height: 200px; object-fit: cover; }
        .item-body { padding: 25px; }
        .item-body h5 { font-size: 18px; font-weight: 800; margin-bottom: 5px; }
        .item-meta { color: #64748b; font-size: 13px; font-weight: 600; }
        .item-actions { position: absolute; top: 15px; right: 15px; display: flex; gap: 8px; }
        .item-actions.bottom { position: static; padding: 0 25px 25px; justify-content: flex-end; }

        .list-view { display: flex; flex-direction: column; gap: 15px; }
        .list-item { background: white; padding: 25px; border-radius: 25px; display: flex; align-items: center; gap: 25px; border: 1px solid #f1f5f9; transition: 0.3s; }
        .list-icon { width: 65px; height: 65px; background: #f8fafc; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
        .list-info { flex: 1; }
        .list-info h5 { font-size: 18px; font-weight: 800; margin-bottom: 5px; }
        .list-info p { font-size: 14px; color: #64748b; font-weight: 500; }
        .list-actions { display: flex; gap: 10px; }

        .view-btn { background: #eff6ff; color: #3b82f6; border: none; padding: 10px; border-radius: 12px; cursor: pointer; }
        .del-btn { background: #fee2e2; color: #dc2626; border: none; padding: 10px; border-radius: 12px; cursor: pointer; }
        .ed-btn { background: #f0fdf4; color: #166534; border: none; padding: 10px; border-radius: 12px; cursor: pointer; }

        .category-accordion-box { background: white; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; overflow: hidden; }
        .category-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; background: #f8fafc; cursor: pointer; transition: 0.3s; }
        .category-header:hover { background: #f1f5f9; }
        .category-header h4 { font-size: 18px; font-weight: 800; color: #020617; margin: 0; }
        .cat-counts { display: flex; align-items: center; gap: 15px; }
        .count-badge { padding: 6px 12px; border-radius: 50px; font-size: 12px; font-weight: 700; }
        .service-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .port-badge { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .expand-icon { font-size: 12px; color: #64748b; margin-left: 10px; }
        .category-body { padding: 25px; border-top: 1px solid #e2e8f0; }
        .cat-section { margin-bottom: 25px; }
        .cat-section:last-child { margin-bottom: 0; }
        .cat-section-title { font-size: 15px; font-weight: 700; color: #475569; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }

        .inquiry-card { border-left: 5px solid #e2e8f0; transition: 0.3s; }
        .inquiry-card.unread { border-left-color: #3b82f6; background: #f0f9ff; }
        .status-tag.quote { background: #fdf2f8; color: #db2777; }
        .status-tag.contact { background: #eff6ff; color: #3b82f6; }
        .unread-dot { background: #ef4444; color: white; font-size: 10px; padding: 2px 6px; border-radius: 10px; margin-left: 5px; min-width: 18px; text-align: center; }

        .notif-bell-container { position: relative; cursor: pointer; color: #64748b; transition: 0.3s; padding: 10px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; }
        .notif-bell-container:hover { color: #10b981; border-color: #10b981; transform: translateY(-2px); }
        .notif-badge { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; font-size: 10px; font-weight: 800; min-width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }

        .cat-items-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
        .nested-item { border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; margin-bottom: 0; }
        .nested-item:hover { background: white; border-color: #10b981; }

        .settings-container { background: white; padding: 40px; border-radius: 35px; border: 1px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.02); }
        .settings-header { margin-bottom: 35px; }
        .settings-header h3 { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        .settings-header p { font-size: 14px; color: #64748b; }
        .settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 35px; }
        .setting-box label { display: block; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
        .setting-box input, .setting-box textarea { width: 100%; padding: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; font-size: 15px; font-weight: 600; color: #0f172a; transition: 0.3s; }
        .setting-box input:focus, .setting-box textarea:focus { border-color: #10b981; background: white; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); outline: none; }
        .save-settings-btn { width: 100%; background: #020617; color: white; border: none; padding: 22px; border-radius: 24px; font-weight: 800; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: 0.3s; margin-top: 10px; }
        .save-settings-btn:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(2, 6, 23, 0.2); }

        .modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 40px; animation: fadeIn 0.3s ease; }
        .detail-modal { background: white; width: 100%; max-width: 600px; border-radius: 32px; padding: 40px; position: relative; animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 40px 100px rgba(0,0,0,0.3); }
        .modal-top-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; }
        .modal-logo-small { height: 40px; width: auto; object-fit: contain; }
        .modal-brand-name { font-size: 18px; font-weight: 800; color: #020617; }
        .close-modal { position: absolute; top: 25px; right: 25px; background: #f1f5f9; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .close-modal:hover { background: #fee2e2; color: #dc2626; transform: rotate(90deg); }
        .badge { background: #ecfdf5; color: #10b981; padding: 5px 12px; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 1px; }
        .modal-header h2 { font-size: 26px; font-weight: 800; margin-top: 12px; }
        .modal-content { margin-top: 30px; }
        .modal-img { width: 100%; height: 220px; object-fit: cover; border-radius: 24px; margin-bottom: 25px; }
        .modal-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
        .info-block.full { grid-column: span 2; }
        .info-label { font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .info-block p { font-size: 14px; font-weight: 600; line-height: 1.6; }
        .info-block a { color: #10b981; font-weight: 700; text-decoration: none; font-size: 14px; }
        .modal-footer { margin-top: 35px; text-align: center; }
        .modal-close-btn { background: #020617; color: white; border: none; padding: 14px 40px; border-radius: 50px; font-weight: 800; cursor: pointer; letter-spacing: 1px; font-size: 13px; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        .status-toast { display: flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: 50px; font-size: 14px; font-weight: 800; }
        .status-toast.success { background: #dcfce7; color: #15803d; border: 1px solid #bdf4d4; }
        
        .custom-popup { background: white; padding: 40px; border-radius: 30px; text-align: center; max-width: 420px; width: 100%; box-shadow: 0 30px 100px rgba(0,0,0,0.2); animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; }
        .popup-icon { width: 70px; height: 70px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .popup-icon.warning { background: #fffbeb; color: #f59e0b; }
        .popup-icon.success { background: #ecfdf5; color: #10b981; }
        .custom-popup h3 { font-size: 24px; font-weight: 800; color: #020617; margin-bottom: 12px; }
        .custom-popup p { color: #64748b; font-size: 16px; margin-bottom: 30px; line-height: 1.5; font-weight: 500; }
        .popup-actions { display: flex; gap: 15px; }
        .popup-actions button { flex: 1; padding: 16px; border-radius: 18px; font-weight: 800; cursor: pointer; border: none; transition: 0.3s; font-size: 15px; }
        .popup-actions .cancel-btn { background: #f1f5f9; color: #64748b; }
        .popup-actions .cancel-btn:hover { background: #e2e8f0; }
        .popup-actions .confirm-btn { background: #020617; color: white; }
        .popup-actions .confirm-btn:hover { background: #10b981; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2); }
        .mt-4 { margin-top: 15px; }
        .status-tag { font-size: 10px; padding: 2px 8px; border-radius: 50px; font-weight: 800; text-transform: uppercase; }
        .status-tag.active { background: #ecfdf5; color: #10b981; }
        .status-tag.inactive { background: #fef2f2; color: #ef4444; }
        .info-pill { font-size: 10px; padding: 2px 10px; border-radius: 4px; font-weight: 700; }
        .info-pill.cat { background: #f1f5f9; color: #475569; }
        .info-pill.tag { background: #f0f9ff; color: #0ea5e9; border: 1px solid #e0f2fe; }
      `}</style>
    </div>
  );
};

export default AdminPortal;
