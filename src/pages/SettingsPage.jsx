import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Palette, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-primary' : 'bg-border-subtle'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true, push: true, sms: false, priceAlerts: true, soldAlerts: true, newsletter: false,
  });
  const [profile, setProfile] = useState({
    name: 'Arjun Kumar', email: 'arjun@email.com', phone: '+91 98765 43210', bio: 'Passionate ticket collector and event enthusiast.',
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-white">Settings</h2>
        <p className="text-text-muted text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar nav */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-bg-card border border-border-subtle rounded-xl2 p-2 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeSection === id
                    ? 'bg-primary/20 text-primary-light border border-primary/30'
                    : 'text-text-muted hover:bg-bg-card-hover hover:text-text-light'}`}
              >
                <Icon size={16} />
                {label}
                {activeSection === id && <ChevronRight size={13} className="ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-bg-card border border-border-subtle rounded-xl2 p-6 space-y-6">

          {activeSection === 'profile' && (
            <>
              <h3 className="font-heading font-semibold text-white text-lg">Profile Information</h3>
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xl font-bold">AK</div>
                <div>
                  <Button variant="secondary" size="sm">Change Avatar</Button>
                  <p className="text-xs text-text-muted mt-1.5">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['Full Name', 'name', 'text'], ['Email Address', 'email', 'email'], ['Phone Number', 'phone', 'tel']].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">{label}</label>
                    <input
                      type={type}
                      value={profile[key]}
                      onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full bg-bg-dark border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/60 transition-all"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    className="w-full bg-bg-dark border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/60 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button variant="primary">Save Changes</Button>
              </div>
            </>
          )}

          {activeSection === 'notifications' && (
            <>
              <h3 className="font-heading font-semibold text-white text-lg">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  ['email', 'Email Notifications', 'Receive updates via email'],
                  ['push', 'Push Notifications', 'Browser & mobile push alerts'],
                  ['sms', 'SMS Alerts', 'Text message notifications'],
                  ['priceAlerts', 'Price Alerts', 'Notify when ticket prices change'],
                  ['soldAlerts', 'Sold Alerts', 'Notify when your ticket sells'],
                  ['newsletter', 'Newsletter', 'Weekly digest and event picks'],
                ].map(([key, label, desc]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-bg-dark/50 rounded-xl border border-border-subtle">
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{desc}</p>
                    </div>
                    <Toggle value={notifications[key]} onChange={v => setNotifications(n => ({ ...n, [key]: v }))} />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === 'security' && (
            <>
              <h3 className="font-heading font-semibold text-white text-lg">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-bg-dark/50 rounded-xl border border-border-subtle">
                  <p className="text-sm font-semibold text-white mb-1">Change Password</p>
                  <p className="text-xs text-text-muted mb-4">Last changed 3 months ago</p>
                  <div className="space-y-3">
                    {['Current Password', 'New Password', 'Confirm Password'].map(lbl => (
                      <input key={lbl} type="password" placeholder={lbl}
                        className="w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/60 transition-all" />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="primary" size="sm">Update Password</Button>
                  </div>
                </div>
                <div className="p-4 bg-bg-dark/50 rounded-xl border border-border-subtle flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-text-muted mt-0.5">Add an extra layer of security</p>
                  </div>
                  <Button variant="secondary" size="sm">Enable 2FA</Button>
                </div>
              </div>
            </>
          )}

          {activeSection === 'billing' && (
            <>
              <h3 className="font-heading font-semibold text-white text-lg">Billing & Payments</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary-light uppercase tracking-wider">Current Plan</span>
                    <span className="text-xs bg-primary/20 text-primary-light px-2 py-0.5 rounded-full font-semibold">Pro</span>
                  </div>
                  <p className="font-heading font-bold text-2xl text-white">₹499<span className="text-sm font-normal text-text-muted">/month</span></p>
                  <p className="text-xs text-text-muted mt-1">Renews on 1 June 2025</p>
                </div>
                <div className="p-4 bg-bg-dark/50 rounded-xl border border-border-subtle flex items-center gap-4">
                  <div className="w-10 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                    <p className="text-xs text-text-muted">Expires 08/27</p>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
              </div>
            </>
          )}

          {activeSection === 'appearance' && (
            <>
              <h3 className="font-heading font-semibold text-white text-lg">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-text-light mb-3">Theme</p>
                  <div className="flex gap-3">
                    {[
                      { id: 'dark', label: 'Dark', bg: 'bg-bg-dark', active: true },
                      { id: 'midnight', label: 'Midnight', bg: 'bg-slate-950', active: false },
                    ].map(t => (
                      <button key={t.id} className={`flex-1 p-4 rounded-xl border-2 transition-all ${t.active ? 'border-primary' : 'border-border-subtle hover:border-primary/40'}`}>
                        <div className={`w-full h-10 ${t.bg} rounded-lg mb-2 border border-border-subtle`} />
                        <p className="text-xs font-medium text-text-light">{t.label}</p>
                        {t.active && <p className="text-xs text-primary-light mt-0.5">Active</p>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
