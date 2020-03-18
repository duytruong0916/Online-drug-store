function QUESTION_2_DEMO(){
    const M = 8;
    const N = 8;
    const X = 4;
    const Y = 4
    const NEWC = 3; 
    let SCREEN = 
    [[1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 1, 1],
    [1, 2, 2, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 2, 2, 0],
    [1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 1],
    ];

    const floodFillUtil = (screen, x, y, prevC, newC) => {
        // Base cases 
        if (x < 0 || x >= M || y < 0 || y >= N)
            return;
        if (screen[x][y] != prevC)
            return;
        // Replace the color at (x, y) 
        screen[x][y] = newC;
        // Recur for north, east, south and west 
        floodFillUtil(screen, x + 1, y, prevC, newC);
        floodFillUtil(screen, x - 1, y, prevC, newC);
        floodFillUtil(screen, x, y + 1, prevC, newC);
        floodFillUtil(screen, x, y - 1, prevC, newC);
    };

    const floodFill = (screen, x, y, newC) => {
        let prevC = screen[x][y];
        floodFillUtil(screen, x, y, prevC, newC);
    };

    floodFill(SCREEN,X,Y,NEWC);

    for (let i = 0; i < M; i++) 
    {   
        let row = '';
        for (let j = 0; j < N; j++){
            row = row + SCREEN[i][j] + ' '
        } 
        console.log(row + "");
    }   
};

QUESTION_2_DEMO();