/**
 * Modular algorithm plug-in system.
 * Register new algorithms here - no UI refactoring required.
 * Each algorithm exports: id, name, type ('sort'|'search'), run(arr, moves) or run(arr, target, moves)
 */
const AlgorithmRegistry = {
    _algorithms: new Map(),

    register(algo) {
        if (!algo.id || !algo.name || !algo.type || !algo.run) {
            throw new Error('Algorithm must have id, name, type, and run function');
        }
        this._algorithms.set(algo.id, algo);
    },

    get(id) {
        return this._algorithms.get(id);
    },

    getByType(type) {
        return Array.from(this._algorithms.values()).filter(a => a.type === type);
    },

    getAll() {
        return Array.from(this._algorithms.values());
    }
};
