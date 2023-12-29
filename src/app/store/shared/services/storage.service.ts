import { Injectable } from "@angular/core";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, uploadString } from "@angular/fire/storage";
import { DataService } from "./data.service";

export interface IFile {
    key: string;
    filename: string;
    name: string;
    downloadUrl: string;
    downloadURL: string;
    fileType: string;
    type: string;
    fileSize: number;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
    uploadPercent: number = 0;
    startUpload: boolean = false;
    no_avatar = `../../../assets/images/no_avatar.jpeg`;

    constructor(private readonly ds: DataService,
    ) { }

    uploadSelectedFile(file: any, filePath: any) {
        const storage = getStorage();
        const storageRef = ref(storage, filePath)
        const task = uploadBytesResumable(storageRef, file)
        return task
    }

    async deleteFile(filename: any) {
        const storage = getStorage();
        const storageRef = ref(storage, filename);
        await deleteObject(storageRef)
    }


    uploadImageAsPromise(file: any) {
        const id_file = this.ds.createId();
        const self = this;
        return new Promise(function (resolve, reject) {
            self.startUpload = true;
            self.uploadPercent = 0;
            const storage = getStorage();
            const filename = `/files/${id_file}_${file.name}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                function progress(snapshot) {
                    const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    self.uploadPercent = percentage;
                },
                function error(err) {
                    reject(err)
                },
                async function complete() {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => { return downloadURL })
                    const fileType = file.type?.split('/').slice(0, -1).join('/');
                    const files = {
                        key: id_file,
                        filename: filename,
                        name: file.name,
                        downloadUrl: downloadURL,
                        fileType: file?.type,
                        type: fileType,
                        fileSize: file?.size || null,
                    }
                    self.startUpload = false;
                    resolve(files)
                }
            )
        })
    }

    async upload(file: any) {
        // this.startUpload = true;
        // const filename = `/files/${this.ds.createId()}_${file.name}`;
        // const uploadTask = this.uploadSelectedFile(file, filename);

        // uploadTask.on('state_changed', snapshot => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     switch (snapshot.state) {
        //         case 'paused':
        //             console.log('Upload is paused');
        //             break;
        //         case 'running':
        //             console.log('Upload is running');
        //             break;
        //     }
        //     return progress;
        // }, (error) => {
        //     alert(error);
        // }, () => {
        //     const downloadURL = getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => { return downloadURL })
        //     let fileType = file.type.split('/').slice(0, -1).join('/');
        //     const files = {
        //         key: this.ds.createId(),
        //         filename: filename,
        //         name: file.name,
        //         downloadUrl: downloadURL,
        //         fileType: file?.type,
        //         type: fileType,
        //         fileSize: file?.size || null,
        //     }
        //     this.startUpload = false;
        // })


        this.startUpload = true;
        const filename = `/files/${this.ds.createId()}_${file.name}`;
        const uploadTask = this.uploadSelectedFile(file, filename);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;
                    }
                    return progress;
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    let fileType = file.type?.split('/').slice(0, -1).join('/');
                    const file_obj = {
                        key: this.ds.createId(),
                        filename: filename,
                        name: file.name,
                        downloadUrl: downloadURL,
                        fileType: file?.type,
                        type: fileType,
                        fileSize: file?.size || null,
                    };
                    this.startUpload = false;
                    resolve(file_obj);
                }
            );
        });
    }

    uploadWithPath(file: any, path: string) {
        const id_file = this.ds.createId();
        const self = this;
        return new Promise(function (resolve, reject) {
            self.startUpload = true;
            self.uploadPercent = 0;
            const storage = getStorage();
            const filename = `/${path}/${id_file}_${file.name}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                function progress(snapshot) {
                    const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    self.uploadPercent = percentage;
                },
                function error(err) {
                    reject(err)
                },
                async function complete() {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => { return downloadURL })
                    const fileType = file.type?.split('/').slice(0, -1).join('/');
                    const files = {
                        key: id_file,
                        filename: filename,
                        name: file.name,
                        downloadUrl: downloadURL,
                        fileType: file?.type,
                        type: fileType,
                        fileSize: file?.size || null,
                    }
                    self.startUpload = false;
                    resolve(files)
                }
            )
        })
    }

    async uploadMulti(fileItems: any[]) {
        const selectedFiles: any[] = [];
        for await (const file of fileItems) {
            const temp = await this.upload(file);
            selectedFiles.push(temp)
        }
        return selectedFiles
    }

    async uploadMultiWithPath(fileItems: any[], path: string) {
        const selectedFiles: any[] = [];
        for await (const file of fileItems) {
            const temp = await this.uploadWithPath(file, path)
            selectedFiles.push(temp)
        }
        return selectedFiles
    }

    async uploadBase64(fileStr: string) {
        const id_file = this.ds.createId();
        const filePath = `/files/${id_file}`;
        const storage = getStorage();
        const storageRef = ref(storage, filePath)
        await uploadString(storageRef, fileStr, 'data_url')
        const downloadUrl = await getDownloadURL(storageRef)
        const file = {
            filename: filePath,
            downloadUrl: downloadUrl,
            key: id_file
        }
        return file;
    }

    async uploadBase64WithPath(fileStr: string, path: string) {
        const id_file = this.ds.createId();
        const filePath = `/${path}/${id_file}`;
        const storage = getStorage();
        const storageRef = ref(storage, filePath)
        await uploadString(storageRef, fileStr, 'data_url')
        const downloadUrl = await getDownloadURL(storageRef)
        const file = {
            filename: filePath,
            downloadUrl: downloadUrl,
            key: id_file
        }
        return file;
    }

}

export type ImageSizeType = '200' | '400' | '680' | '720' | '1024' | '1280' | '1920'

export function transformImageSameTokenNo(uri: string, size: ImageSizeType) {
    const [pathUrl, token, rawPath] = UrlToPath(uri)
    const [path, name] = fileNameAddSize(pathUrl, size)
    const pathName = size ? `${path ? `${path}/` : ''}thumbs/${name}` : `${path ? `${path}/` : ''}${name}`
    const ref = encodeURIComponent(pathName)
    return { uri: `${rawPath}${ref}${token ? `?${token}` : ''}` }

}


export function UrlToPath(url: string) {
    const rawSplit = url?.split('/').pop()?.split('?')
    const rawPath = url?.replace(url?.split('/').pop() ?? '', '')
    if (Array.isArray(rawSplit) && rawSplit.length > 0) {
        return [decodeURIComponent(rawSplit[0]), rawSplit[1], rawPath]
    }
    return ['', '', '']
}

export function fileNameAddSize(pathUrl: string, size?: ImageSizeType) {
    const imgname = pathUrl?.split('/').pop()?.split('.').slice(0, -1).join('.') || pathUrl?.split('/').pop() || ''
    const path = pathUrl?.split('/').slice(0, -1).join('/')
    const urlWithoutExt = pathUrl?.replace(/\.[^/.]+$/, '') || ''
    const ext = pathUrl?.replace(urlWithoutExt, '') || ''
    const imgSize = size ? `_${size}x${size}` : ''
    const name = `${imgname}${imgSize}${ext}`
    return [path, name]
}
