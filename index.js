// Panggil express
const express = require('express');

// menggunakan package express
const app = express()

// gunakan static folder
app.use('/public', express.static(__dirname + '/public'))
app.use('/views', express.static(__dirname + '/views'))

// port server
const port = 1000;
app.listen(port, () => {
    console.log(`Listening to server : ${port}`);
})

const bodyParser = require('body-parser')

// body parser | mengambil value dari hasil submit form khusus untuk body aja 

app.use(bodyParser.urlencoded({ extended: true }))
    // atur view engine
app.set('view engine', 'hbs');

// Array dengan nilai default
const project = [{
        projectName: 'Indonesia',
        description: 'Dapet emas',
        startDate: "17-12-2022",
        endDate: "19-12-s2022",
        technologies: {
            nodeJs: 'NodeJs',
            nextJs: undefined,
            reactJs: undefined,
            typeScript: undefined
        },
        duration: '2 days'
    }

];

const isLogin = true

// endpoint 
app.get('/', function(req, res) {
    res.render('index2', { title: 'My home page' })

})


app.get('/home', function(req, res) {
    res.render('index2', { title: 'My home page' })
})

app.get('/project', function(req, res) {
    res.render('myproject', { title: 'My Project' })
})

app.get('/add', function(req, res) {
    // mapping untuk memanipulasi data
    // spread operator mengambil data secara keseluruhan

    // let dataProject = project.map(function(data) {

    //     return {
    //         ...data,
    //         isLogin,
    //         author: 'Fuad Azkia',
    //         description: 'Coba aja'
    //     }

    // })
    res.render('addmyproject', { title: 'Add my project' })
        // console.log(dataProject);
        // res.redirect('/project')
})


app.post('/add', function(req, res) {
    let technologies = {
        nodeJs: req.body.nodeJs,
        nextJs: req.body.nextJs,
        reactJs: req.body.reactJs,
        typeScript: req.body.typeScript
    }

    let myProject = {
        projectName: req.body.name,
        description: req.body.description,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        technologies
    }

    project.push(myProject)

    // Hitung Durasi
    let date1 = new Date(myProject.startDate);
    let date2 = new Date(myProject.endDate);
    let duration = ''
    duration = date2.getTime() - date1.getTime()

    let Difference_In_Days = duration / (1000 * 3600 * 24)
    res.render('addmyproject', { isLogin })

    project.push(Difference_In_Days)
    console.log(project);

    // res.redirect('/add')

})


app.get('/contact', function(req, res) {
    res.render('contact', { isLogin }, { title: 'My contact' })
})

app.post('/contact', function(req, res) {
    let option = {
        talk: req.body.talk,
        collab: req.body.collab,
        hiring: req.body.hiring
    }
    let myContact = {
        name: req.body.name,
        email: req.body.mail,
        nohp: req.body.hape,
        option,
        message: req.body.pesan
    }
    res.render('contact', { isLogin })
    console.log(myContact);
})


// app.get('/detail/:id', function(req, res) {
//     res.render('detail-project2')
//     let id = req.params.id
//     console.log(`id : ${id}`);
// })

app.get('/detail/:id', function(req, res) {
    let id = req.params.id
        // console.log(`id : ${id}`);
    res.render('detail-project1', { id })
})



function getFullTime(time) {

    const date = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();

    let hour = time.getHours();
    let minute = time.getMinutes();

    if (minute < 10) {
        minute = '0' + minute
    };

    if (hour < 10) {
        hour = '0' + hour
    };

    return `${date} ${month[monthIndex]} ${year} ${hour} :${minute}WIB`
}