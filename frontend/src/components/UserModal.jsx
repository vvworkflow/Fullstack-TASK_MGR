import { useState } from 'react'

const EMPTY_FORM = { name: ''}

export default function UserModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.name.trim()) {
      setError('NAME IS REQUIRED')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError('! API ERROR: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={handleBackdrop}
    >
      <div className="modal-box bg-gb-card border-2 border-gb-orange w-full max-w-md font-mono">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-gb-border">
          <span className="text-gb-orange text-sm font-bold uppercase tracking-widest">
            [ NEW USER ]
          </span>
          <button onClick={onClose} className="text-gb-muted hover:text-gb-orange text-lg leading-none transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">NAME *</label>
            <input
              type="text"
              className="gb-input"
              value={form.name}
              onChange={set('name')}
              placeholder="name..."
            />
          </div>

          {error && <p className="text-red-400 text-xs uppercase tracking-wider">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t-2 border-gb-border">
          <button className="gb-btn text-xs" onClick={onClose}>CANCEL</button>
          <button className="gb-btn-primary text-xs" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '[ SAVING... ]' : 'CREATE'}
          </button>
        </div>
      </div>
    </div>
  )
}