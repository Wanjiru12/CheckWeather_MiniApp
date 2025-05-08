const apikey = "";

Page({
    data: {
        cityName: "",
        weather: null,
        main: "",
        isReportAvailable: false,
    },

    onInput(e) {
        this.setData({
            cityName: e.detail.value,
        });
    },
    LoadAbout() {
        my.navigateTo({
            url: "/pages/about/about",
        });
    },
    getWeather() {
        const city = this.data.cityName;
        if (!city) {
            my.alert({
                content: "Please enter a city name",
            });
            return;
        }

        my.request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
            method: "GET",
            success: (res) => {
                if (res.data) {
                    this.setData({
                        isReportAvailable: true,
                    });
                    this.setData({
                        cityName: res.data.name,
                    });
                    this.setData({
                        weather: res.data.weather,
                    });
                    this.setData({
                        main: res.data.main,
                    });
                    // console.log("we recieved:" + JSON.stringify(res.data));
                    //console.log("we found dta:" + JSON.stringify(this.data));
                } else {
                    my.alert({
                        content: "Weather data not found",
                    });
                }
            },
            fail: (e) => {
                //console.log("This is our error;" + JSON.stringify(e));

                my.alert({
                    content: "API request failed",
                });
            },
        });
    },
});