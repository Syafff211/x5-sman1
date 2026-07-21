'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, Edit, Trash2, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const students = [
  { id: 1, name: 'Ahmad Rizky', nisn: '1234567890', email: 'ahmad@email.com', role: 'Ketua Kelas' },
  { id: 2, name: 'Siti Nurhaliza', nisn: '1234567891', email: 'siti@email.com', role: 'Wakil Ketua' },
  { id: 3, name: 'Dewi Lestari', nisn: '1234567892', email: 'dewi@email.com', role: 'Sekretaris' },
  { id: 4, name: 'Budi Santoso', nisn: '1234567893', email: 'budi@email.com', role: 'Bendahara' },
  { id: 5, name: 'Rina Wati', nisn: '1234567894', email: 'rina@email.com', role: '' },
  { id: 6, name: 'Andi Pratama', nisn: '1234567895', email: 'andi@email.com', role: '' },
  { id: 7, name: 'Maya Sari', nisn: '1234567896', email: 'maya@email.com', role: '' },
  { id: 8, name: 'Fajar Hidayat', nisn: '1234567897', email: 'fajar@email.com', role: '' },
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nisn.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      toast.success('Siswa berhasil dihapus');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Kelola Siswa</h1>
          <p className="text-muted-foreground">Manajemen data siswa kelas X-5</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Siswa
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari siswa berdasarkan nama, NISN, atau email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:glow-primary transition-all duration-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{student.name}</h3>
                      {student.role && (
                        <Badge variant="default" className="gap-1">
                          <Crown className="h-3 w-3" />
                          {student.role}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">NISN: {student.nisn}</p>
                    <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(student.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Tidak ada siswa ditemukan</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
