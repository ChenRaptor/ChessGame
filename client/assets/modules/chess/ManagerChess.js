class ManagerChess
{ 
    constructor() 
    {
        this.socket = io.connect(':8090')
        this.setupPlacement = 
        [
            ['T-2-1', 'C-2-1', 'F-2-1', 'D-2', 'R-2', 'F-2-2', 'C-2-2', 'T-2-2'],
            ['P-2-1', 'P-2-2', 'P-2-3', 'P-2-4', 'P-2-5', 'P-2-6', 'P-2-7', 'P-2-8'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P-1-1', 'P-1-2', 'P-1-3', 'P-1-4', 'P-1-5', 'P-1-6', 'P-1-7', 'P-1-8'],
            ['T-1-1', 'C-1-1', 'F-1-1', 'D-1', 'R-1', 'F-1-2', 'C-2-2', 'T-1-2'],
        ]
    }

    setup()
    {
        return this.setupPlacement
    }




}