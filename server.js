// server.js
// where your node app starts

// init project
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
app.engine('html', ejs.__express);
app.set('views', './views');
app.set('view engine', 'html');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './imdb.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

app.get('/movie/:imdb_id', function(req, res) {  
  db.all('SELECT * from imdb where imdb_id = ? limit 1', req.params.imdb_id, function(err, rows) {
    if (rows.length==0){
      res.render('404');
    }else{     
      var imdb_id = rows[0]['imdb_id'];
      var color = rows[0]['color'];
      var director_name = rows[0]['director_name'];
      var num_critic_for_reviews = rows[0]['num_critic_for_reviews'];
      var duration = rows[0]['duration'];
      var director_facebook_likes = rows[0]['director_facebook_likes'];
      var actor_3_facebook_likes = rows[0]['actor_3_facebook_likes'];
      var actor_2_name = rows[0]['actor_2_name'];
      var actor_1_facebook_likes = rows[0]['actor_1_facebook_likes'];
      var gross = rows[0]['gross'];
      var genres = rows[0]['genres'].split('|');
      var actor_1_name = rows[0]['actor_1_name'];
      var movie_title = rows[0]['movie_title'];
      var num_voted_users = rows[0]['num_voted_users'];
      var cast_total_facebook_likes = rows[0]['cast_total_facebook_likes'];
      var actor_3_name = rows[0]['actor_3_name'];
      var facenumber_in_poster = rows[0]['facenumber_in_poster'];
      var plot_keywords = rows[0]['plot_keywords'].split('|');
      var movie_imdb_link = rows[0]['movie_imdb_link'];
      var num_user_for_reviews = rows[0]['num_user_for_reviews'];
      var language = rows[0]['language'];
      var country = rows[0]['country'];
      var content_rating = rows[0]['content_rating'];
      var budget = rows[0]['budget'];
      var title_year = rows[0]['title_year'];
      var actor_2_facebook_likes = rows[0]['actor_2_facebook_likes'];
      var imdb_score = rows[0]['imdb_score'];
      var aspect_ratio = rows[0]['aspect_ratio'];
      var movie_facebook_likes = rows[0]['movie_facebook_likes'];  
      var poster = rows[0]['poster'];  

      
      var referer = req.headers.referer;

      res.render('movie', {referer: referer, imdb_id : imdb_id,color : color,director_name : director_name,num_critic_for_reviews : num_critic_for_reviews,duration : duration,director_facebook_likes : director_facebook_likes,actor_3_facebook_likes : actor_3_facebook_likes,actor_2_name : actor_2_name,actor_1_facebook_likes : actor_1_facebook_likes,gross : gross,genres : genres,actor_1_name : actor_1_name,movie_title : movie_title,num_voted_users : num_voted_users,cast_total_facebook_likes : cast_total_facebook_likes,actor_3_name : actor_3_name,facenumber_in_poster : facenumber_in_poster,plot_keywords : plot_keywords,movie_imdb_link : movie_imdb_link,num_user_for_reviews : num_user_for_reviews,language : language,country : country,content_rating : content_rating,budget : budget,title_year : title_year,actor_2_facebook_likes : actor_2_facebook_likes,imdb_score : imdb_score,aspect_ratio : aspect_ratio,movie_facebook_likes : movie_facebook_likes, poster: poster});
    }
  });
});

app.get('/search', function(req, res) {  
  if (!req.query.searchin){
    req.query.searchin = 'title';
    req.query.searchval = 'DO A BLANK SEARCH';
  }
  
  if (req.query.searchin == 'all'){
    var sql = 'SELECT * from imdb where movie_title like ? or genres like ? or plot_keywords like ? or director_name like ? or actor_1_name like ? or actor_2_name like ? or actor_3_name like ?';
  }
  if (req.query.searchin == 'title'){
    var sql = 'SELECT * from imdb where movie_title like ?';
  }
  if (req.query.searchin == 'genre'){
    var sql = 'SELECT * from imdb where genres like ?';
  }
  if (req.query.searchin == 'keyword'){
    var sql = 'SELECT * from imdb where plot_keywords like ?';
  }  
  if (req.query.searchin == 'director'){
    var sql = 'SELECT * from imdb where director_name like ?';
  }
  if (req.query.searchin == 'actor'){
    var sql = 'SELECT * from imdb where actor_1_name like ? or actor_2_name like ? or actor_3_name like ?';
  }  
  if (req.query.orderby == 'title'){
    sql = sql + ' order by movie_title asc';
  }
  if (req.query.orderby == 'imdb'){
    sql = sql + ' order by imdb_score desc';
  }

  
  sql = sql + ' LIMIT 100';
  
  db.all(sql, '%'+req.query.searchval+'%', function(err, rows) {
    console.log(sql);
    if (err){console.log(err);}
    var results = [];      
    rows.forEach((r)=>{
      r.genres = r.genres.split('|');
      r.plot_keywords = r.plot_keywords.split('|');
      results.push(r);
    });

    res.render('search', {results:results});
  });
  
  
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {

    db.all('SELECT * FROM imdb ORDER BY RANDOM() LIMIT 10;', function(err, rows) {

      var imdb_id1 = rows[0]['imdb_id'];
      var color1 = rows[0]['color'];
      var director_name1 = rows[0]['director_name'];
      var num_critic_for_reviews1 = rows[0]['num_critic_for_reviews'];
      var duration1 = rows[0]['duration'];
      var director_facebook_likes1 = rows[0]['director_facebook_likes'];
      var actor_3_facebook_likes1 = rows[0]['actor_3_facebook_likes'];
      var actor_2_name1 = rows[0]['actor_2_name'];
      var actor_1_facebook_likes1 = rows[0]['actor_1_facebook_likes'];
      var gross1 = rows[0]['gross'];
      var genres1 = rows[0]['genres'].split('|');
      var actor_1_name1 = rows[0]['actor_1_name'];
      var movie_title1 = rows[0]['movie_title'];
      var num_voted_users1 = rows[0]['num_voted_users'];
      var cast_total_facebook_likes1 = rows[0]['cast_total_facebook_likes'];
      var actor_3_name1 = rows[0]['actor_3_name'];
      var facenumber_in_poster1 = rows[0]['facenumber_in_poster'];
      var plot_keywords1 = rows[0]['plot_keywords'].split('|');
      var movie_imdb_link1 = rows[0]['movie_imdb_link'];
      var num_user_for_reviews1 = rows[0]['num_user_for_reviews'];
      var language1 = rows[0]['language'];
      var country1 = rows[0]['country'];
      var content_rating1 = rows[0]['content_rating'];
      var budget1 = rows[0]['budget'];
      var title_year1 = rows[0]['title_year'];
      var actor_2_facebook_likes1 = rows[0]['actor_2_facebook_likes'];
      var imdb_score1 = rows[0]['imdb_score'];
      var aspect_ratio1 = rows[0]['aspect_ratio'];
      var movie_facebook_likes1 = rows[0]['movie_facebook_likes'];      
      var poster1 = rows[0]['poster'];      

      var imdb_id2 = rows[1]['imdb_id'];
      var color2 = rows[1]['color'];
      var director_name2 = rows[1]['director_name'];
      var num_critic_for_reviews2 = rows[1]['num_critic_for_reviews'];
      var duration2 = rows[1]['duration'];
      var director_facebook_likes2 = rows[1]['director_facebook_likes'];
      var actor_3_facebook_likes2 = rows[1]['actor_3_facebook_likes'];
      var actor_2_name2 = rows[1]['actor_2_name'];
      var actor_1_facebook_likes2 = rows[1]['actor_1_facebook_likes'];
      var gross2 = rows[1]['gross'];
      var genres2 = rows[1]['genres'].split('|');
      var actor_1_name2 = rows[1]['actor_1_name'];
      var movie_title2 = rows[1]['movie_title'];
      var num_voted_users2 = rows[1]['num_voted_users'];
      var cast_total_facebook_likes2 = rows[1]['cast_total_facebook_likes'];
      var actor_3_name2 = rows[1]['actor_3_name'];
      var facenumber_in_poster2 = rows[1]['facenumber_in_poster'];
      var plot_keywords2 = rows[1]['plot_keywords'].split('|');
      var movie_imdb_link2 = rows[1]['movie_imdb_link'];
      var num_user_for_reviews2 = rows[1]['num_user_for_reviews'];
      var language2 = rows[1]['language'];
      var country2 = rows[1]['country'];
      var content_rating2 = rows[1]['content_rating'];
      var budget2 = rows[1]['budget'];
      var title_year2 = rows[1]['title_year'];
      var actor_2_facebook_likes2 = rows[1]['actor_2_facebook_likes'];
      var imdb_score2 = rows[1]['imdb_score'];
      var aspect_ratio2 = rows[1]['aspect_ratio'];
      var movie_facebook_likes2 = rows[1]['movie_facebook_likes'];      
      var poster2 = rows[1]['poster'];      

      var imdb_id3 = rows[2]['imdb_id'];
      var color3 = rows[2]['color'];
      var director_name3 = rows[2]['director_name'];
      var num_critic_for_reviews3 = rows[2]['num_critic_for_reviews'];
      var duration3 = rows[2]['duration'];
      var director_facebook_likes3 = rows[2]['director_facebook_likes'];
      var actor_3_facebook_likes3 = rows[2]['actor_3_facebook_likes'];
      var actor_2_name3 = rows[2]['actor_2_name'];
      var actor_1_facebook_likes3 = rows[2]['actor_1_facebook_likes'];
      var gross3 = rows[2]['gross'];
      var genres3 = rows[2]['genres'].split('|');
      var actor_1_name3 = rows[2]['actor_1_name'];
      var movie_title3 = rows[2]['movie_title'];
      var num_voted_users3 = rows[2]['num_voted_users'];
      var cast_total_facebook_likes3 = rows[2]['cast_total_facebook_likes'];
      var actor_3_name3 = rows[2]['actor_3_name'];
      var facenumber_in_poster3 = rows[2]['facenumber_in_poster'];
      var plot_keywords3 = rows[2]['plot_keywords'].split('|');
      var movie_imdb_link3 = rows[2]['movie_imdb_link'];
      var num_user_for_reviews3 = rows[2]['num_user_for_reviews'];
      var language3 = rows[2]['language'];
      var country3 = rows[2]['country'];
      var content_rating3 = rows[2]['content_rating'];
      var budget3 = rows[2]['budget'];
      var title_year3 = rows[2]['title_year'];
      var actor_2_facebook_likes3 = rows[2]['actor_2_facebook_likes'];
      var imdb_score3 = rows[2]['imdb_score'];
      var aspect_ratio3 = rows[2]['aspect_ratio'];
      var movie_facebook_likes3 = rows[2]['movie_facebook_likes'];      
      var poster3 = rows[2]['poster'];      

      // console.log(rows)
      res.render('index', {
        imdb_id1 : imdb_id1,color1 : color1,director_name1 : director_name1,num_critic_for_reviews1 : num_critic_for_reviews1,duration1 : duration1,director_facebook_likes1 : director_facebook_likes1,actor_3_facebook_likes1 : actor_3_facebook_likes1,actor_2_name1 : actor_2_name1,actor_1_facebook_likes1 : actor_1_facebook_likes1,gross1 : gross1,genres1 : genres1,actor_1_name1 : actor_1_name1,movie_title1 : movie_title1,num_voted_users1 : num_voted_users1,cast_total_facebook_likes1 : cast_total_facebook_likes1,actor_3_name1 : actor_3_name1,facenumber_in_poster1 : facenumber_in_poster1,plot_keywords1 : plot_keywords1,movie_imdb_link1 : movie_imdb_link1,num_user_for_reviews1 : num_user_for_reviews1,language1 : language1,country1 : country1,content_rating1 : content_rating1,budget1 : budget1,title_year1 : title_year1,actor_2_facebook_likes1 : actor_2_facebook_likes1,imdb_score1 : imdb_score1,aspect_ratio1 : aspect_ratio1,movie_facebook_likes1 : movie_facebook_likes1, poster1:poster1,
        imdb_id2: imdb_id2,color2: color2,director_name2: director_name2,num_critic_for_reviews2: num_critic_for_reviews2,duration2: duration2,director_facebook_likes2: director_facebook_likes2,actor_3_facebook_likes2: actor_3_facebook_likes2,actor_2_name2: actor_2_name2,actor_1_facebook_likes2: actor_1_facebook_likes2,gross2: gross2,genres2: genres2,actor_1_name2: actor_1_name2,movie_title2: movie_title2,num_voted_users2: num_voted_users2,cast_total_facebook_likes2: cast_total_facebook_likes2,actor_3_name2: actor_3_name2,facenumber_in_poster2: facenumber_in_poster2,plot_keywords2: plot_keywords2,movie_imdb_link2: movie_imdb_link2,num_user_for_reviews2: num_user_for_reviews2,language2: language2,country2: country2,content_rating2: content_rating2,budget2: budget2,title_year2: title_year2,actor_2_facebook_likes2: actor_2_facebook_likes2,imdb_score2: imdb_score2,aspect_ratio2: aspect_ratio2,movie_facebook_likes2: movie_facebook_likes2, poster2: poster2,
        imdb_id3:imdb_id3,color3:color3,director_name3:director_name3,num_critic_for_reviews3:num_critic_for_reviews3,duration3:duration3,director_facebook_likes3:director_facebook_likes3,actor_3_facebook_likes3:actor_3_facebook_likes3,actor_2_name3:actor_2_name3,actor_1_facebook_likes3:actor_1_facebook_likes3,gross3:gross3,genres3:genres3,actor_1_name3:actor_1_name3,movie_title3:movie_title3,num_voted_users3:num_voted_users3,cast_total_facebook_likes3:cast_total_facebook_likes3,actor_3_name3:actor_3_name3,facenumber_in_poster3:facenumber_in_poster3,plot_keywords3:plot_keywords3,movie_imdb_link3:movie_imdb_link3,num_user_for_reviews3:num_user_for_reviews3,language3:language3,country3:country3,content_rating3:content_rating3,budget3:budget3,title_year3:title_year3,actor_2_facebook_likes3:actor_2_facebook_likes3,imdb_score3:imdb_score3,aspect_ratio3:aspect_ratio3,movie_facebook_likes3:movie_facebook_likes3, poster3: poster3
      });
    
  });  
});






app.get('/relatedkeyword/:search', function(req, res) {
  var sql = 'SELECT * from imdb where plot_keywords like ?';
  db.all(sql, '%'+req.params.search+'%', function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get('/relatedgenres/:search', function(req, res) {
  var sql = 'SELECT * from imdb where genres like ?';
  db.all(sql, '%'+req.params.search+'%', function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});


app.get('/relateddirector/:search', function(req, res) {
  var sql = 'SELECT * from imdb where director_name like ?';
  db.all(sql, '%'+req.params.search+'%', function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get('/relatedactor/:search', function(req, res) {
  var sql = 'SELECT * from imdb where actor_1_name like ? or actor_2_name like ? or actor_3_name like ?';
  db.all(sql, '%'+req.params.search+'%', function(err, rows) {
    res.send(JSON.stringify(rows));
  });
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
