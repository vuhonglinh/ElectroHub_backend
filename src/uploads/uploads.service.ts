import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
    private readonly uploadDir = './uploads';
    constructor() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    handleFileUpload(file: Express.Multer.File): string {
        try {
            if (!file) {
                throw new BadRequestException('No file uploaded');
            }
            // Kiểm tra loại file
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new BadRequestException('Invalid file type');
            }
            // Kiểm tra kích thước file
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                throw new BadRequestException('File is too large!');
            }
            const newFilename = `${Date.now()}-${file.originalname}`;
            const destination = path.join(this.uploadDir, newFilename);
            fs.writeFileSync(destination, file.buffer);
            return destination; // Trả về đường dẫn file sau khi upload
        } catch (err) {
            throw new BadRequestException(err.message || 'File upload failed');
        }
    }
    handleMutiFileUpload(files: Array<Express.Multer.File>): string[] {
        try {
            if (!files || files.length === 0) {
                throw new BadRequestException('No files uploaded');
            }
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            const uploadedFilePaths: string[] = [];
            for (const file of files) {
                // Kiểm tra loại file
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    throw new BadRequestException(`Invalid file type for file: ${file.originalname}`);
                }
                // Kiểm tra kích thước file
                if (file.size > maxSize) {
                    throw new BadRequestException(`File ${file.originalname} is too large!`);
                }
                // Lưu file vào thư mục
                const newFilename = `${Date.now()}-${file.originalname}`;
                const destination = path.join(this.uploadDir, newFilename);
                fs.writeFileSync(destination, file.buffer);
                uploadedFilePaths.push(destination); // Lưu đường dẫn file đã upload
            }
            return uploadedFilePaths; // Trả về danh sách đường dẫn file
        } catch (err) {
            throw new BadRequestException(err.message || 'Multiple file upload failed');
        }
    }
    handleDeleteFile(filePath: string): void {
        try {
            if (!filePath) {
                throw new BadRequestException('File path is required');
            }
            const absolutePath = path.resolve(filePath);
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
            } else {
                throw new BadRequestException('File not found');
            }
        } catch (err) {
            throw err;
        }
    }
}
