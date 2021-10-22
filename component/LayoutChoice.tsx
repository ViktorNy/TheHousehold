import React from "react";
import { useAppSelector } from "../store/store";
import { getAllUsersSelector } from "../store/user/userSelector";

let modalTitle = '';
let ModalLeft = '';
let modalRight = '';
let modalPlaceholder = '';

export function LayoutChoice(modalCase: string, id: string) {
    const allUsers = useAppSelector(getAllUsersSelector);
    const username = allUsers.find(u => u.id === id)?.username;

    if (modalCase === 'JH') {
          modalTitle = 'Gå med i Hushåll'
          ModalLeft = 'Gå med'
          modalRight = 'Avbryt'
          modalPlaceholder = 'Hushållskod'
        } 
        else if (modalCase === 'CH') {
          modalTitle = 'Skapa Hushåll'
          ModalLeft = 'Skapa'
          modalRight = 'Avbryt'
          modalPlaceholder = 'Namn'
        }
        else if (modalCase === 'MO') {
          modalTitle = 'Gör till ägare'
          ModalLeft = 'Acceptera'
          modalRight = 'Avbryt'
          modalPlaceholder = 'Gör ' + username + ' till ägare'
        }
        else if (modalCase === 'RUFH') {
          modalTitle = 'Ta bort från hushåll'
          ModalLeft = 'Ja'
          modalRight = 'Avbryt'
          modalPlaceholder = 'Vill du verkligen ta bort' + username + '?'
        }
        else if (modalCase === 'AR') {
          modalTitle = 'Besvara förfrågan'
          ModalLeft = 'Acceptera'
          modalRight = 'Avslå'
          modalPlaceholder = username + ' vill gå med'
        }
        return {modalTitle, ModalLeft, modalRight, modalPlaceholder}
}