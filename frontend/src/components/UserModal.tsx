import { useState } from 'react'
import { UserCreatePayload } from '../types'

interface Props {
  onClose: () => void
  onSubmit: (payload: UserCreatePayload) => Promise<void>
}

export default function UserModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<UserCreatePayload>({ fullname: '', role: "developer", username: '' , password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  async function handleSubmit() {
    if (!form.fullname.trim()) {
      setError('FULLNAME IS REQUIRED')
      return
    }
    if (!form.username.trim()) {
      setError('USERNAME IS REQUIRED')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await onSubmit(form)
      onClose()
    } catch (err) {
      setError('! API ERROR: ' + (err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
      <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={handleBackdrop}
      >
        <div className="modal-box bg-gb-card border-2 border-gb-orange w-full max-w-md font-mono">
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-gb-border">
            <span className="text-gb-orange text-sm font-bold uppercase tracking-widest">[ NEW USER ]</span>
            <button onClick={onClose} className="text-gb-muted hover:text-gb-orange text-lg leading-none transition-colors">✕</button>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div>
              <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">USERNAME *</label>
              <input
                  type="text"
                  className="gb-input"
                  value={form.username}
                  onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                  placeholder="username..."
              />
            </div>
            <div>
              <label className="text-gb-muted text-xs uppercase tracking-wider block mb-1">FULLNAME *</label>
              <input
                  type="text"
                  className="gb-input"
                  value={form.fullname}
                  onChange={(e) => setForm((p) => ({ ...p, fullname: e.target.value }))}
                  placeholder="full name..."
              />
            </div>

            {error && <p className="text-red-400 text-xs uppercase tracking-wider">{error}</p>}
          </div>

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