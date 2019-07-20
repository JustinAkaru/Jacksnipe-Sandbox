export class AssetManager{
    constructor(){
        AssetManager.unloadedAssets = [];
        AssetManager.successCount = 0;
        AssetManager.errorCount = 0;
        AssetManager.cache = {};
    }

    loadAsset (path) {
        AssetManager.unloadedAssets.push(path);
    }

    loadAssets(callback) {
        if (AssetManager.unloadedAssets.length === 0) {
            callback();
        }

        for (var i = 0; i < AssetManager.unloadedAssets.length; i++) {
            var path = AssetManager.unloadedAssets[i];
            var img = new Image();
            img.addEventListener("load", function() {
                AssetManager.successCount += 1;
                if (AssetManager.isDone()) {
                    callback();
                }
            }, false);
            img.addEventListener("error", function() {
                AssetManager.errorCount += 1;
                if (AssetManager.isDone()) {
                    callback();
                }
            }, false);
            img.src = path;
            AssetManager.cache[path] = img;
        }

        console.log(`${AssetManager.successCount}:${AssetManager.errorCount}`)
    }

    static isDone() {
        return (AssetManager.unloadedAssets.length == AssetManager.successCount + AssetManager.errorCount);
    }

    getAsset(path) {
        return AssetManager.cache[path];
    }
}