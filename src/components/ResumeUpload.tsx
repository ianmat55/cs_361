"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import uploadResume from "@/app/actions/uploadResume";

interface ResumeUploadProps {
  onUploadComplete?: (file: File) => void;
  className?: string;
}

export default function ResumeUpload({
  onUploadComplete,
  className,
}: ResumeUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setUploadError(null);
    setUploadSuccess(false);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === "file-too-large") {
        setUploadError("File size must be less than 5MB");
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        setUploadError("Only PDF files are allowed");
      } else {
        setUploadError("Invalid file. Please upload a PDF file under 5MB.");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResume(formData);
 
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadSuccess(true);
      onUploadComplete?.(file);

      // Redirect to dashboard after successful upload
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error(error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  if (uploadSuccess) {
    return (
      <div className={cn("mx-auto max-w-md", className)}>
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-green-200 bg-green-50 p-8">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-green-800">
            Upload Successful!
          </h3>
          <p className="text-sm text-green-600 mb-4 text-center">
            Your resume has been uploaded and is being analyzed for job matches.
          </p>
          <p className="text-xs text-green-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (uploadedFile && isUploading) {
    return (
      <div className={cn("mx-auto max-w-md", className)}>
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <p className="font-medium text-sm">{uploadedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={isUploading}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-md", className)}>
      {uploadError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 transition-colors cursor-pointer",
          isDragActive && "border-primary/40 bg-primary/10",
          "hover:border-primary/40 hover:bg-primary/10"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          {isDragActive ? "Drop your resume here" : "Upload Your Resume"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          {isDragActive
            ? "Release to upload your PDF resume"
            : "Drag & drop your PDF here, or click to browse"}
        </p>
        <Button size="lg" className="text-base" type="button">
          Choose File & Get Started
        </Button>
        <p className="text-xs text-muted-foreground mt-3">PDF only • Max 5MB</p>
      </div>
    </div>
  );
}
