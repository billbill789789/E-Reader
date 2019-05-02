import { Component } from '@angular/core';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
    constructor(private transfer: FileTransfer,private document: DocumentViewer,private file:File,private toastController: ToastController,private loadingCtrl: LoadingController) {
    }

    private openPDF(bookNumber){
        let options: DocumentViewerOptions = {
            title: 'My PDF'
        }
        this.document.viewDocument('file:///data/data/io.ionic.starter/files/'+bookNumber+'.pdf', 'application/pdf',options);
    }

    async download(bookNumber) {
        var fileTransfer: FileTransferObject = this.transfer.create();
        const url = 'http://eve.kean.edu/~lait/XduceDemo/'+bookNumber+'.pdf';
        let loading = await this.loadingCtrl.create();
        loading.present();
        fileTransfer.download(url, this.file.dataDirectory + bookNumber+'.pdf').then((entry) => {
            this.presentToast();
            loading.dismiss();
        }, (error) => {
            // handle error
        });
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'This book is saved in your device.',
            duration: 2000
        });
        toast.present();
    }


}