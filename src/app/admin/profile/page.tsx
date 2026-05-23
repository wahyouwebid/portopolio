'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, X } from 'lucide-react';
import { skills as initialSkills, experiences as initialExperiences } from '@/data/about';
import { Skill, Experience } from '@/types';
import toast from 'react-hot-toast';

export default function AdminProfilePage() {
  const [bio, setBio] = useState(
    'Mobile Engineer with 6+ years of experience building high-performance apps with Flutter, Kotlin, and Swift. Passionate about clean architecture and exceptional user experiences.'
  );
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: 'mobile' as Skill['category'] });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Profile saved successfully!');
    setSaving(false);
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    if (skills.some((s) => s.name === newSkill.name.trim())) return;
    const skill: Skill = { ...newSkill };
    setSkills([...skills, skill]);
    setNewSkill({ name: '', level: 80, category: 'mobile' });
  };

  const removeSkill = (name: string) => setSkills(skills.filter((s) => s.name !== name));

  const updateSkill = (name: string, field: keyof Skill, value: string | number) =>
    setSkills(skills.map((s) => (s.name === name ? { ...s, [field]: value } : s)));

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) =>
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const removeExperience = (id: string) => setExperiences(experiences.filter((e) => e.id !== id));

  const addExperience = () => {
    const exp: Experience = {
      id: Date.now().toString(),
      company: 'New Company',
      position: 'Position Title',
      startDate: '2024-01',
      endDate: undefined,
      description: 'Describe your role here.',
      current: false,
      technologies: [],
    };
    setExperiences([exp, ...experiences]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Edit your about / profile information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all disabled:opacity-60"
        >
          {saving ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Bio */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h2 className="text-white font-semibold text-sm mb-4">Biography</h2>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60 resize-none"
          />
        </motion.div>

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h2 className="text-white font-semibold text-sm mb-4">Skills</h2>

          {/* Add new */}
          <div className="flex gap-3 mb-5 flex-wrap">
            <input
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="Skill name"
              className="flex-1 min-w-[150px] px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-indigo-500/60 placeholder-slate-600"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as Skill['category'] })}
              className="px-3 py-2 rounded-xl bg-[#16161f] border border-white/[0.08] text-white text-sm focus:outline-none"
            >
              <option value="mobile">Mobile</option>
              <option value="language">Language</option>
              <option value="tool">Tool</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              min={1}
              max={100}
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 80 })}
              className="w-20 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none"
              title="Level (0-100)"
            />
            <button onClick={addSkill} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="space-y-2.5">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.name, 'name', e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                />
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.name, 'category', e.target.value)}
                  className="text-slate-400 text-xs bg-transparent focus:outline-none"
                >
                  <option value="mobile" className="bg-[#16161f]">Mobile</option>
                  <option value="language" className="bg-[#16161f]">Language</option>
                  <option value="tool" className="bg-[#16161f]">Tool</option>
                  <option value="other" className="bg-[#16161f]">Other</option>
                </select>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-white/[0.08]">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${skill.level}%` }} />
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.name, 'level', parseInt(e.target.value) || 0)}
                    className="w-12 bg-transparent text-slate-400 text-xs focus:outline-none text-right"
                  />
                  <span className="text-slate-600 text-xs">%</span>
                </div>
                <button onClick={() => removeSkill(skill.name)} className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experiences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Experience</h2>
            <button onClick={addExperience} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/[0.08] text-white text-xs hover:bg-white/[0.08] transition-all">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 mr-4">
                    <input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Position"
                      className="bg-transparent text-white text-sm font-medium focus:outline-none border-b border-white/[0.06] pb-1"
                    />
                    <input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company"
                      className="bg-transparent text-indigo-400 text-sm focus:outline-none border-b border-white/[0.06] pb-1"
                    />
                    <input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Start (YYYY-MM)"
                      className="bg-transparent text-slate-400 text-xs focus:outline-none"
                    />
                    <input
                      value={exp.endDate || ''}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="End (YYYY-MM or blank)"
                      className="bg-transparent text-slate-400 text-xs focus:outline-none"
                    />
                  </div>
                  <button onClick={() => removeExperience(exp.id)} className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="w-full bg-transparent text-slate-400 text-xs focus:outline-none resize-none"
                  placeholder="Describe your role..."
                />
                <label className="flex items-center gap-2 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="w-3.5 h-3.5 accent-indigo-500"
                  />
                  Current position
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
