let stdin = process.openStdin();
stdin.on('data', function(data) {
    let base = data.toString().slice(0, -2).split(" ");

    let [a, b] = [+base[0], +base[1]];

    function moder(a, b) {
        if (a === 0) {
            console.log(b);
        } else if (b === 0) {
            console.log(a);
        } else {
            if (a > b) {
                a = a % b;
            } else {
                b = b % a;
            }
            moder(a, b);
        }
    }

    moder(a, b);
});