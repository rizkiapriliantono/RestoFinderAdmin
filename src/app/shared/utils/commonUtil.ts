import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { ConstantaUtil } from './constantaUtil';

import { AES } from 'crypto-js';
import { FuseConfirmationService } from '../../ui-service/confirmation/confirmation.service';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


declare var require: any;

@Injectable({
    providedIn: 'root', // just before your class
})
export class CommonUtils {

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
    ) {}

    /**
     * Need on several pages
     */
    public localStorageUserSession() {
        if (localStorage.getItem('profile')) {
            return JSON.parse(this.decrypt(localStorage.getItem('profile')));
        }
    }

    // public localStorageUserItemPost() {
    //     if (localStorage.getItem('item-post')) {
    //         return JSON.parse(this.decyprt(localStorage.getItem('item-post')));
    //     }
    // }

    // public localStorageMenu() {
    //     if (localStorage.getItem('menu')) {
    //         return JSON.parse(this.decyprt(localStorage.getItem('menu')));
    //     }
    // }

    /**
     * @author pramudhavardanik01
     * 25 Juli 2023
     * Set url report
     */
    // public localStorageUrlReport() {
    //     if (localStorage.getItem('report')) {
    //         return JSON.parse(this.decyprt(localStorage.getItem('report')));
    //     }
    // }

    /**
     * Generate UUID
     * @returns UUID
     */
     public static generateUuId (): string {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    /**
     * Generate java standard hashcode
     * @param input
     * @returns
     */
    public static generateHash (input: string) : string {
        var hash = 0, i = 0, len = input.length;
        while ( i < len ) {
            hash  = ((hash << 5) - hash + input.charCodeAt(i++)) << 0;
        }
        return String(hash).padStart(8, '0');
    }

    /**
   * Param Crypto
   */
  private getCryptoJS() {
    // const CryptoJS = require('crypto-js');
    const pass = CryptoJS.enc.Utf8.parse(environment.SECRET);
    const salt = CryptoJS.enc.Utf8.parse(environment.SALT);
    const iv = CryptoJS.enc.Utf8.parse(environment.SECRET);
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: 256 / 32,
      iterations: environment.ITERATION
    });
    return { CryptoJS, iv, key };
  }

  public encrypt(value: any) {
    const { CryptoJS, iv, key } = this.getCryptoJS();
    return btoa(
      CryptoJS.AES.encrypt(JSON.stringify(value), key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    );
  }

  /**
   * Add by @Rizkia04
   * @copyright Encrypted data String
   */
  public encryptString(value: any) {
    const { CryptoJS, iv, key } = this.getCryptoJS();
    return btoa(
      CryptoJS.AES.encrypt(value, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    );
  }

  public decrypt(value: any) {
    const { CryptoJS, iv, key } = this.getCryptoJS();
    return CryptoJS.AES.decrypt(atob(value), key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }

    /**
     * @author pramudhavardanik01
     * convert <nil> to null
     * @param value
     * @returns
     */
    public convertNilToNull(value: any): any {
        return value === "<nil>" ? null : value;
    }

    showErrorPopUp(title:string, message:string){
        return this._fuseConfirmationService.open(
            {
                title:title,
                message:message,
                icon : {
                    show : true,
                    name : 'heroicons_outline:exclamation-circle',
                    color: 'warn'
                },
                actions    : {
                    confirm: {
                        show : true,
                        label: 'OK',
                        color: 'warn'
                    },
                    cancel : {
                        show : false,
                        label: 'OK'
                    }
                },
        });
    }

    showSuccessPopUp(title:string, message:string){
        return this._fuseConfirmationService.open({
            title      : title,
            message    : message,
            icon       : {
                show : true,
                name : 'heroicons_outline:information-circle',
                color: 'success'
            },
            actions    : {
                confirm: {
                    show : true,
                    label: 'OK',
                    color: 'warn'
                },
                cancel : {
                    show : false,
                    label: 'OK'
                }
            },
        });
    }

    showConfirmationPopUp(title:string, message:string){
        return this._fuseConfirmationService.open({
            title      : title,
            message    : message,
            icon       : {
                show : true,
                name : 'heroicons_outline:check-circle',
                color: 'warning'
            },
            actions    : {
                confirm: {
                    show : true,
                    label: 'Yes',
                    color: 'warn'
                },
                cancel : {
                    show : true,
                    label: 'Cancel'
                }
            },
        })
    }

    public validationPatternPhoneNumber(event: any){
        const input = String.fromCharCode(event.keyCode);
        if( !(/^[0-9-+() ]*$/.test(input)) ) {
            event.preventDefault();
        }
     }

    //#region param iframe
    public decodeUrl(decodeString:string){
        return decodeURIComponent(decodeString.replace(/\+/g," "));
    }

    /**
     * @author JT
     * Set new timestamp for session
     * @param timestamp
     * @param key
     */
    setSessionTimestamp(timestamp: string, key: string): void {
        /* set new timestamp */
        let encryptedTimestamp = AES.encrypt(timestamp, key).toString();
        localStorage.setItem(
            ConstantaUtil.SM_TIMESTAMP_KEY,
            encryptedTimestamp
        );
    }

    /**
     * @author JT
     * Generate 8 char long key
     * @param key
     * @returns
     */
     generateSessionKey(key: string): string {
        return CommonUtils.generateHash(key).substring(0, 8);
    }
     //#endregion param iframe

    //  public encrypt(value: any) {
    //   const { CryptoJS, iv, key } = this.getCryptoJS();
    //   return btoa(
    //     CryptoJS.AES.encrypt(JSON.stringify(value), key, {
    //       iv,
    //       mode: CryptoJS.mode.CBC,
    //       padding: CryptoJS.pad.Pkcs7
    //     }).toString()
    //   );
    // }

    // public decyprt(value: any) {
    //   const { CryptoJS, iv, key } = this.getCryptoJS();
    //   return CryptoJS.AES.decrypt(atob(value), key, {
    //     iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7
    //   }).toString(CryptoJS.enc.Utf8);
    // }
}
