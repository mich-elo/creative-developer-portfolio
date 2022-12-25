export function detectCollision(pleft, pright, ptop, pbottom, pcleft, pcright, pctop, pcbottom){
        if(((pleft <= pcright) && (pright >= pcleft) && (pbottom >= pctop) && (ptop <= pcbottom))){      
            return true
        }
    }

export function iscollideLeft(pleft, pcright){
        if(pleft <= pcright){
            return true;
        }
        return false;
    }

export function iscollideRight(pright, pcleft){
        if(pright >= pcleft){
            return true;
        }
        return false;
    }

export function iscollideTop(ptop, pcbottom){
        if(ptop <= pcbottom){
            return true;
        }
        return false;
    }
export function iscollideBottom(pbottom, pctop, pright, pcLength){
    if((pbottom >= pctop) && (pright < pcLength) ){
        return true;
    }
    return false;
}
