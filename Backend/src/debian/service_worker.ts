import dockerode from 'dockerode';
const docker = new dockerode();

//0 -> super
//1 -> error

let con: dockerode.Container;

const create = async () => {
    try {
        con = await docker.createContainer({
            Image: 'debian',
            name: 'node-1',
            Tty: true
        });
        return 0;
    } catch (e) {
        console.error(`Error while create machine ${e}`);
        return 1;
    }

};

const remove = async () => {
    try {
        con.remove();
        con = null;
        return 0;
    } catch (e) {
        console.error(`Error while removing machine ${e}`);
        return 1;
    }
};

const start = async () => {
    try {
        con.start();
        return 0;
    } catch(e) {
        console.error(`Error while starting machine ${e}`);
        return 1;
    }
};

const stop = async () => {
    try {
        con.stop();
        return 0;
    } catch (e) {
        console.error(`Error while stopping machine ${e}`);
        return 1;
    }
};

const status = async () => {

    //TODO: Update this method with docker.getConatiner in a try catch


    // 0 -> running
    // 1 -> stoped
    // 2 -> notcreated 
    if (!con) {
        //notcreated
        return 2;
    }   
    const containerInfo = await con.inspect();  
    if (!containerInfo.State.Running) return 1;
    return 0;

};

export {start, stop, status, create, remove}