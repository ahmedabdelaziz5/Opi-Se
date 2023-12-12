// function to filter media files and get array of paths

const filterMediaFiles = (files, filter)=>{
    const mediaFiles = [];
    files.map((file)=>{
        mediaFiles.push(file[filter]);
    })
    return mediaFiles;
}; 

module.exports = filterMediaFiles;