const folderName = "/Folder/Sub";
const regex = new RegExp(`(^${folderName})(/.*)?$`);

console.log("/Folder".replace(regex, "/Folder/Subs"));
console.log("/Folder/Sub".replace(regex, "/Folder/Subs"));
