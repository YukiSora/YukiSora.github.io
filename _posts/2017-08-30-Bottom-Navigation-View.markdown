---
layout: article
title: "Bottom Navigation View"
date: 2017-08-30 14:15:50 +0800
categories: development
---

BottomNavigationView 是遵循 Material Design 的底部导航栏。

## 基础用法

BottomNavigationView 布局。<br>
只有背景是白色的时候才会有阴影。

{% highlight xml %}
<android.support.design.widget.BottomNavigationView
    android:id="@+id/bottomNavigationView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@android:color/white"
    app:elevation="8dp"
    app:menu="@menu/navigation_menu" />
{% endhighlight %}

item 菜单项。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/item1"
        android:title="Item1"
        android:icon="@android:drawable/sym_def_app_icon" />
    <item
        android:id="@+id/item2"
        android:title="Item2"
        android:icon="@android:drawable/sym_def_app_icon" />
    <item
        android:id="@+id/item3"
        android:title="Item3"
        android:icon="@android:drawable/sym_def_app_icon" />

</menu>
{% endhighlight %}

事件监听。

{% highlight java %}
BottomNavigationView bottomNavigationItemView = (BottomNavigationView)findViewById(R.id.bottomNavigationView);
bottomNavigationItemView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        return true;
    }
});
bottomNavigationItemView.setOnNavigationItemReselectedListener(new BottomNavigationView.OnNavigationItemReselectedListener() {
    @Override
    public void onNavigationItemReselected(@NonNull MenuItem item) {
    }
});
{% endhighlight %}

---

## 其他

手动设置按键。

{% highlight java %}
Menu menu = bottomNavigationItemView.getMenu();
bottomNavigationItemView.setSelectedItemId(menu.getItem(1).getItemId());
{% endhighlight %}

---
