import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { GraduationCap, MessageSquareText, Star, Send, LayoutDashboard, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react'

const API = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/feedback`
const emptyForm = { studentName: '', department: '', year: '', category: 'Teaching', rating: 5, message: '' }

export default function App() {
  const [form, setForm] = useState(emptyForm)
  const [feedback, setFeedback] = useState([])
  const [activeTab, setActiveTab] = useState('submit')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadFeedback = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(API)
      setFeedback(data)
      setError('')
    } catch {
      setError('Could not load feedback. Check that the backend is running and the API URL is correct.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadFeedback() }, [])

  const update = (event) => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setNotice('')
    setError('')
    try {
      await axios.post(API, { ...form, rating: Number(form.rating) })
      setForm(emptyForm)
      setNotice('Thank you! Your feedback has been submitted.')
      await loadFeedback()
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please check the backend connection and try again.')
    }
  }

  const removeFeedback = async (id) => {
    if (!window.confirm('Delete this feedback entry?')) return
    try {
      await axios.delete(`${API}/${id}`)
      setFeedback(items => items.filter(item => item._id !== id))
    } catch {
      setError('Could not delete this entry.')
    }
  }

  const average = useMemo(() => feedback.length
    ? (feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1)
    : '—', [feedback])

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={() => setActiveTab('submit')}>
          <span className="brand-icon"><GraduationCap size={23} /></span>
          <span>Campus<span className="brand-accent">Voice</span><small>STUDENT FEEDBACK PORTAL</small></span>
        </a>
        <div className="top-note"><span className="status-dot" /> Your voice helps us improve</div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">A BETTER CAMPUS STARTS WITH YOU</p>
            <h1>Share your thoughts.<br /><span>Shape your campus.</span></h1>
            <p className="hero-copy">Tell us about your learning experience, facilities and campus life. Every response helps us make things better.</p>
          </div>
          <div className="hero-art"><div className="art-circle"><MessageSquareText size={58} strokeWidth={1.4} /></div><span className="spark spark-one">✦</span><span className="spark spark-two">✧</span></div>
        </section>

        <nav className="tabs">
          <button className={activeTab === 'submit' ? 'tab active' : 'tab'} onClick={() => setActiveTab('submit')}><Send size={17} /> Submit Feedback</button>
          <button className={activeTab === 'admin' ? 'tab active' : 'tab'} onClick={() => { setActiveTab('admin'); loadFeedback() }}><LayoutDashboard size={17} /> Feedback Dashboard <span className="count">{feedback.length}</span></button>
        </nav>

        {notice && <div className="alert success"><CheckCircle2 size={18} />{notice}</div>}
        {error && <div className="alert error">{error}</div>}

        {activeTab === 'submit' ? (
          <section className="content-card">
            <div className="section-heading"><div><p className="eyebrow">STUDENT SURVEY</p><h2>Feedback Form</h2><p className="muted">Please share your honest feedback. Fields marked * are required.</p></div><span className="form-icon"><MessageSquareText size={25} /></span></div>
            <form onSubmit={submit}>
              <div className="form-grid">
                <label>Student name *<input name="studentName" value={form.studentName} onChange={update} placeholder="Enter your name" required maxLength="80" /></label>
                <label>Department *<select name="department" value={form.department} onChange={update} required><option value="">Select department</option>{['Information Technology','Computer Science','Electronics and Communication','Electrical and Electronics','Mechanical','Civil','Other'].map(item => <option key={item}>{item}</option>)}</select></label>
                <label>Year of study *<select name="year" value={form.year} onChange={update} required><option value="">Select year</option>{['1st Year','2nd Year','3rd Year','4th Year'].map(item => <option key={item}>{item}</option>)}</select></label>
                <label>Feedback category *<select name="category" value={form.category} onChange={update}>{['Teaching','Infrastructure','Library','Laboratory','Campus Facilities','Canteen','Other'].map(item => <option key={item}>{item}</option>)}</select></label>
              </div>
              <div className="rating-block"><label className="field-title">How would you rate your experience? *</label><div className="stars" role="radiogroup" aria-label="Rating">{[1,2,3,4,5].map(n => <button type="button" key={n} aria-label={`${n} stars`} aria-pressed={Number(form.rating) === n} className={Number(form.rating) >= n ? 'star selected' : 'star'} onClick={() => setForm(current => ({...current, rating:n}))}><Star size={28} fill="currentColor" /></button>)}</div><span className="rating-caption">{['','Poor','Fair','Good','Very good','Excellent'][Number(form.rating)]}</span></div>
              <label className="message-label">Your feedback *<textarea name="message" value={form.message} onChange={update} placeholder="What is working well? What could we improve?" rows="5" required minLength="5" maxLength="2000" /></label>
              <div className="form-footer"><span className="privacy-note">Please do not include passwords or other sensitive information.</span><button className="primary-btn" type="submit"><Send size={17} /> Submit feedback</button></div>
            </form>
          </section>
        ) : (
          <section className="dashboard">
            <div className="stats">
              <div className="stat-card"><span>Total responses</span><strong>{feedback.length}</strong><MessageSquareText /></div>
              <div className="stat-card"><span>Average rating</span><strong>{average}{average !== '—' && <small>/5</small>}</strong><Star /></div>
            </div>
            <div className="content-card">
              <div className="section-heading"><div><p className="eyebrow">OVERVIEW</p><h2>Student responses</h2><p className="muted">Review feedback submitted through the student portal.</p></div><button className="refresh-btn" onClick={loadFeedback}><RefreshCw size={16} /> Refresh</button></div>
              {loading ? <p className="empty">Loading feedback…</p> : feedback.length === 0 ? <p className="empty">No feedback submitted yet.</p> : (
                <div className="feedback-list">{feedback.map(item => <article className="feedback-item" key={item._id}><div className="feedback-top"><div><strong>{item.studentName}</strong><span>{item.department} · {item.year}</span></div><div className="item-actions"><span className="category-pill">{item.category}</span><button className="delete-btn" title="Delete feedback" onClick={() => removeFeedback(item._id)}><Trash2 size={16} /></button></div></div><div className="mini-stars">{'★'.repeat(item.rating)}<span>{'★'.repeat(5-item.rating)}</span></div><p>{item.message}</p><time>{new Date(item.createdAt).toLocaleString()}</time></article>)}</div>
              )}
            </div>
            <p className="admin-warning">Demo dashboard: this page has no administrator login. Add authentication before using it with real student data.</p>
          </section>
        )}
        <footer>© {new Date().getFullYear()} CampusVoice · Student Feedback Portal</footer>
      </main>
    </div>
  )
}
