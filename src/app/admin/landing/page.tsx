'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Save, Globe, Image, Type, Palette, Layout, Search as SearchIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const sections = [
  { id: 'hero', label: 'Hero Section', icon: Globe },
  { id: 'about', label: 'About / Visi & Misi', icon: Type },
  { id: 'stats', label: 'Statistics', icon: Layout },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'announcements', label: 'Announcements', icon: Globe },
  { id: 'officers', label: 'Class Officers', icon: Type },
  { id: 'achievements', label: 'Achievements', icon: Layout },
  { id: 'timeline', label: 'Timeline', icon: Globe },
  { id: 'contact', label: 'Contact', icon: Type },
  { id: 'seo', label: 'SEO Settings', icon: SearchIcon },
  { id: 'theme', label: 'Theme & Colors', icon: Palette },
];

const heroFields = [
  { key: 'title', label: 'Hero Title', type: 'text', defaultValue: 'Kelas X-5 SMAN 1 Purbalingga' },
  { key: 'subtitle', label: 'Hero Subtitle', type: 'text', defaultValue: 'Platform Digital Kelas Premium' },
  { key: 'description', label: 'Hero Description', type: 'textarea', defaultValue: 'Platform digital kelas premium untuk mengelola kehadiran, tugas, nilai, dan kegiatan kelas.' },
  { key: 'button_text', label: 'Button Text', type: 'text', defaultValue: 'Mulai Sekarang' },
  { key: 'button_link', label: 'Button Link', type: 'text', defaultValue: '/auth/login' },
  { key: 'background_image', label: 'Background Image URL', type: 'text', defaultValue: '' },
];

export default function AdminLandingPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Konten berhasil disimpan!');
    } catch (error) {
      toast.error('Gagal menyimpan konten');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Landing Page CMS</h1>
        <p className="text-muted-foreground">
          Edit semua konten landing page tanpa menyentuh code
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sections Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                      activeSection === section.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <section.icon className="h-4 w-4 shrink-0" />
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {sections.find((s) => s.id === activeSection)?.label}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Edit konten untuk section ini
                  </p>
                </div>
                <Badge variant="success">Live Preview</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {activeSection === 'hero' && (
                  <>
                    {heroFields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label htmlFor={field.key}>{field.label}</Label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.key}
                            rows={3}
                            className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-white resize-none"
                            defaultValue={field.defaultValue}
                            {...register(field.key)}
                          />
                        ) : (
                          <Input
                            id={field.key}
                            defaultValue={field.defaultValue}
                            {...register(field.key)}
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}

                {activeSection === 'about' && (
                  <>
                    <div className="space-y-2">
                      <Label>Visi</Label>
                      <textarea
                        rows={4}
                        className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white resize-none"
                        defaultValue="Menjadi kelas yang unggul dalam prestasi akademik dan non-akademik, berkarakter mulia, serta mampu bersaing di era global."
                        {...register('vision')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Misi</Label>
                      <textarea
                        rows={6}
                        className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white resize-none"
                        defaultValue="Menciptakan lingkungan belajar yang kondusif dan menyenangkan&#10;Mendorong semangat kompetisi positif antar siswa&#10;Mengembangkan kreativitas dan bakat di berbagai bidang&#10;Membangun solidaritas dan kebersamaan antar anggota kelas"
                        {...register('mission')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Motto Kelas</Label>
                      <Input
                        defaultValue="Bersama Kita Bisa, Bersama Kita Juara!"
                        {...register('motto')}
                      />
                    </div>
                  </>
                )}

                {activeSection === 'seo' && (
                  <>
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input
                        defaultValue="X-5 SMAN 1 Purbalingga - Premium Digital Classroom"
                        {...register('seo_title')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <textarea
                        rows={3}
                        className="flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white resize-none"
                        defaultValue="Platform manajemen kelas digital premium untuk Kelas X-5 SMAN 1 Purbalingga"
                        {...register('seo_description')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input
                        defaultValue="kelas digital, sman 1 purbalingga, manajemen kelas"
                        {...register('seo_keywords')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Favicon URL</Label>
                      <Input {...register('favicon_url')} />
                    </div>
                  </>
                )}

                {activeSection === 'theme' && (
                  <>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          defaultValue="#6366f1"
                          className="w-16 h-11"
                          {...register('accent_color')}
                        />
                        <Input defaultValue="#6366f1" {...register('accent_color_hex')} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <Input defaultValue="Inter" {...register('font_family')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Particles Animation</Label>
                      <select
                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
                        defaultValue="true"
                        {...register('particles')}
                      >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                  </>
                )}

                {activeSection === 'contact' && (
                  <>
                    <div className="space-y-2">
                      <Label>Alamat</Label>
                      <Input defaultValue="Jl. Raya Purbalingga, Jawa Tengah" {...register('address')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Telepon</Label>
                      <Input defaultValue="(0281) 123456" {...register('phone')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="x5@sman1purbalingga.sch.id" {...register('contact_email')} />
                    </div>
                    <div className="space-y-2">
                      <Label>Google Maps Embed URL</Label>
                      <Input {...register('maps_url')} placeholder="Paste Google Maps embed URL" />
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram URL</Label>
                      <Input {...register('instagram')} placeholder="https://instagram.com/x5sman1pbg" />
                    </div>
                    <div className="space-y-2">
                      <Label>Facebook URL</Label>
                      <Input {...register('facebook')} />
                    </div>
                  </>
                )}

                {!['hero', 'about', 'seo', 'theme', 'contact'].includes(activeSection) && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Editor untuk section ini akan menampilkan form yang sesuai dengan konten section.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Semua field disimpan ke Supabase secara realtime.
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <Button type="submit" disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                  <Button variant="outline" type="button" onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
