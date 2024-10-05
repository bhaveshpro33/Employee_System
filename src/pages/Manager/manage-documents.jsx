'use client';
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Trash2, Edit } from 'lucide-react'
import ThemeToggle from '@/components/ui/theme-toggle'
import { LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom"


const initialDocuments = [
  { id: 1, name: "John Doe", type: "Aadhaar Card", uploadDate: "2023-06-15", imageUrl: "/placeholder.svg?height=100&width=200" },
  { id: 2, name: "Jane Smith", type: "Voter ID", uploadDate: "2023-06-20", imageUrl: "/placeholder.svg?height=100&width=200" },
  { id: 3, name: "Alice Johnson", type: "Aadhaar Card", uploadDate: "2023-06-25", imageUrl: "/placeholder.svg?height=100&width=200" },
]

export function ManageDocuments() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [editingDoc, setEditingDoc] = useState(null)
  const navigate=useNavigate()
  const handleExit = () => {
    navigate('/manager') 
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const newDocument = {
        id: documents.length + 1,
        name: "New Employee",
        type: "Aadhaar Card",
        uploadDate: new Date().toISOString().split('T')[0],
        imageUrl: URL.createObjectURL(file)
      }
      setDocuments([...documents, newDocument])
    }
  }

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
  }

  const handleEditDocument = (doc) => {
    setEditingDoc(doc)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    const updatedDocs = documents.map(doc => 
      doc.id === editingDoc.id ? editingDoc : doc)
    setDocuments(updatedDocs)
    setEditingDoc(null)
  }

  return (
    (<div
      className="space-y-6 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Employee Documents</h2>
        <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button 
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
          </div>
      </div>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Employee Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <Input type="text" placeholder="Search documents..." className="max-w-sm" />
            <Button
              onClick={() => document.getElementById('file-upload').click()}
              className="bg-blue-500 hover:bg-blue-600 text-white">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800 dark:text-gray-200">Employee Name</TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">Document Type</TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">Upload Date</TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">Preview</TableHead>
                <TableHead className="text-gray-800 dark:text-gray-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">{doc.name}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">{doc.type}</TableCell>
                  <TableCell className="text-gray-800 dark:text-gray-200">{doc.uploadDate}</TableCell>
                  <TableCell>
                    <img
                      src={doc.imageUrl}
                      alt={`${doc.name}'s ${doc.type}`}
                      className="w-20 h-12 object-cover" />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditDocument(doc)}
                        className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={editingDoc !== null} onOpenChange={() => setEditingDoc(null)}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-100">Edit Employee Document</DialogTitle>
          </DialogHeader>
          {editingDoc && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee Name</label>
                <Input
                  id="name"
                  value={editingDoc.name}
                  onChange={(e) => setEditingDoc({...editingDoc, name: e.target.value})}
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Document Type</label>
                <select
                  id="type"
                  value={editingDoc.type}
                  onChange={(e) => setEditingDoc({...editingDoc, type: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                  <option>Aadhaar Card</option>
                  <option>Voter ID</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Document Image</label>
                <img
                  src={editingDoc.imageUrl}
                  alt={`${editingDoc.name}'s ${editingDoc.type}`}
                  className="w-full h-40 object-cover mb-2" />
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setEditingDoc({...editingDoc, imageUrl: URL.createObjectURL(file)})
                    }
                  }}
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
              </div>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>)
  );
}