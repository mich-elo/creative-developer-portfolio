export function detectCollision(pleft, pright, ptop, pbottom, pcleft, pcright, pctop, pcbottom){
        if(((pleft <= pcright) && (pright >= pcleft) && (pbottom >= pctop) && (ptop <= pcbottom))){      
            return true
        }
    }

// export function iscollideLeft(playerLeftPos, objectRightPos){
//         if((playerLeftPos <= objectRightPos) && (playerHeight >= ) ){
//             return true;
//         }
//         return false;
//     }

export function iscollideRight(pright, pcleft){
        if(pright >= pcleft){
            return true;
        }
        return false;
    }

export function iscollideTop(ptop, pcbottom, pright, pcLength, pLength, pcright){
        if(ptop <= pcbottom && (pright < pcLength) && (pLength > pcright)){
            return true;
        }
        return false;
    }

    
export function iscollideBottom(pbottom, pctop, pright, pcLength, pLength, pcright){
    if((pbottom >= pctop) && (pright < pcLength) && (pLength > pcright) ){
        return true;
    }
    return false;
}
