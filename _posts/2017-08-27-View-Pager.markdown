---
layout: article
title: "View Pager"
date: 2017-08-27 17:46:23 +0800
categories: android
---

ViewPager 允许用户左右翻页。

## 基础用法

ViewPager 布局。

{% highlight xml %}
<android.support.v4.view.ViewPager
    android:id="@+id/viewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
{% endhighlight %}

内容页面布局文件。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Poi"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
{% endhighlight %}

内容页面初始化。

{% highlight java %}
LayoutInflater inflater = getLayoutInflater();
final ArrayList<View> views = new ArrayList<>();
for (int i = 0; i < 5; i++) {
    views.add(inflater.inflate(R.layout.view_pager_item, null));
}
{% endhighlight %}

adapter 实现。

{% highlight java %}
ViewPager viewPager = (ViewPager)findViewById(R.id.viewPager);
viewPager.setAdapter(new PagerAdapter() {
    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        container.addView(views.get(position));

        return views.get(position);
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView(views.get(position));
    }

    @Override
    public int getCount() {
        return views.size();
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == object;
    }
});
{% endhighlight %}

---

## Fragment 用法

Fragment 实现。

{% highlight java %}
public class ViewPageFragment extends Fragment {
    public static ViewPageFragment newInstance() {
        Bundle args = new Bundle();
        ViewPageFragment fragment = new ViewPageFragment();
        fragment.setArguments(args);

        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.view_pager_item, container, false);
    }
}
{% endhighlight %}

adapter 实现。<br/>
根据 Fragment 版本选择 getFragmentManager 或者 getSupportFragmentManager。<br/>
FragmentPagerAdapter 不会回收 Fragment，FragmentStatePagerAdapter 会回收 Fragment 但是会储存 state。

{% highlight java %}
ViewPager viewPager = (ViewPager)findViewById(R.id.viewPager);
viewPager.setAdapter(new FragmentPagerAdapter(getSupportFragmentManager()) {
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return ViewPageFragment.newInstance();
            case 1:
                return ViewPageFragment.newInstance();
            case 2:
                return ViewPageFragment.newInstance();
            case 3:
                return ViewPageFragment.newInstance();
            case 4:
                return ViewPageFragment.newInstance();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return 5;
    }
});
{% endhighlight %}

---

## OnPageChangeListener

OnPageChangeListener 可以处理当页面转换时的情况。

{% highlight java %}
viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
    }

    @Override
    public void onPageSelected(int position) {
    }

    @Override
    public void onPageScrollStateChanged(int state) {
    }
});
{% endhighlight %}

---

## PageTransformer

可以设置滚动动画。

{% highlight java %}
viewPager.setPageTransformer(true, new ViewPager.PageTransformer() {
    @Override
    public void transformPage(View page, float position) {
        page.setScaleX(0.8F + 0.2F * (1 - Math.abs(position)));
        page.setScaleY(0.8F + 0.2F * (1 - Math.abs(position)));
    }
});
{% endhighlight %}

---

## 其他

手动滑动页面。

{% highlight java %}
viewPager.setCurrentItem(position, true);
{% endhighlight %}

缓存页面 2 * limit + 1 个。

{% highlight java %}
viewPager.setOffscreenPageLimit(limit);
{% endhighlight %}

设置页面间隔。

{% highlight java %}
viewPager.setPageMargin(margin);
{% endhighlight %}

---
