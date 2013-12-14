# For an explanation of the steroids.config properties, see the guide at
# http://guides.appgyver.com/steroids/guides/project_configuration/config-application-coffee/

steroids.config.name = "Inpakt"

# -- Initial Location --
#steroids.config.location = "http://localhost/index.html"

# -- Tab Bar --
steroids.config.tabBar.enabled = true
steroids.config.tabBar.tabs = [
  {
    title: "Voluntariado"
    icon: "img/prototipo10@2x.png"
    location: "http://localhost/views/volunteering/index.html"
  },
  {
    title: "Instituições"
    icon: "img/prototipo11@2x.png"
    location: "http://localhost/views/npo/index.html"
  },
  {
    title: "Perfil"
    icon: "img/prototipo12@2x.png"
    location: "http://localhost/views/user/index.html"
  }
]
steroids.config.tabBar.tintColor = "#e1e4e3"
steroids.config.tabBar.tabTitleColor = "#b2b2b2"
steroids.config.tabBar.selectedTabTintColor = "#575757"
# steroids.config.tabBar.selectedTabBackgroundImage = "icons/pill@2x.png"

# steroids.config.tabBar.backgroundImage = ""

# -- Navigation Bar --
steroids.config.navigationBar.tintColor = "#00aeef"
steroids.config.navigationBar.titleColor = "#ffffff"
steroids.config.navigationBar.buttonTintColor = "#ffffff"
steroids.config.navigationBar.buttonTitleColor = "#ffffff"

# steroids.config.navigationBar.landscape.backgroundImage = ""
# steroids.config.navigationBar.portrait.backgroundImage = ""

# -- Android Loading Screen
steroids.config.loadingScreen.tintColor = "#262626"

# -- iOS Status Bar --
steroids.config.statusBar.enabled = true
steroids.config.statusBar.style = "default"

# -- File Watcher --
# steroids.config.watch.exclude = ["www/my_excluded_file.js", "www/my_excluded_dir"]

# -- Pre- and Post-Make hooks --
# steroids.config.hooks.preMake.cmd = "echo"
# steroids.config.hooks.preMake.args = ["running yeoman"]
# steroids.config.hooks.postMake.cmd = "echo"
# steroids.config.hooks.postMake.args = ["cleaning up files"]

# -- Default Editor --
# steroids.config.editor.cmd = "subl"
# steroids.config.editor.args = ["."]
