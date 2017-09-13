---
layout: article
title: "Recycler View"
date: 2017-08-31 14:13:55 +0800
categories: android
---

RecyclerView 是新的数据集显示控件，比以往都更加灵活。

## 基础用法

RecyclerView 布局。

{% highlight xml %}
<android.support.v7.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
{% endhighlight %}

单项布局文件。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="100dp">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
{% endhighlight %}

项目数据。

{% highlight java %}
class ItemData {
    String text;

    ItemData(String text) {
        this.text = text;
    }
}
{% endhighlight %}

项目数据初始化。

{% highlight java %}
ArrayList<ItemData> data = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    data.add(new ItemData("Item:" + i));
}
{% endhighlight %}

adapter 实现。

{% highlight java %}
class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private ArrayList<ItemData> data;

    RecyclerViewAdapter(ArrayList<ItemData> data) {
        this.data = data;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ItemViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_item, parent, false));
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        ((ItemViewHolder)holder).bindData(data.get(position));
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    private class ItemViewHolder extends RecyclerView.ViewHolder {
        private TextView textView;

        ItemViewHolder(View view) {
            super(view);

            textView = view.findViewById(R.id.textView);
        }

        void bindData(ItemData data) {
            textView.setText(data.text);
        }
    }
}
{% endhighlight %}

RecyclerView 初始化。<br>
LayoutManager 还可以选择 GridLayoutManager 和 StaggeredGridLayoutManager。

{% highlight java %}
RecyclerView recyclerView = (RecyclerView)findViewById(R.id.recyclerView);
recyclerView.setLayoutManager(new LinearLayoutManager(this));
RecyclerViewAdapter adapter = new RecyclerViewAdapter(data);
recyclerView.setAdapter(adapter);
{% endhighlight %}

---

## 增删数据

增加数据。

{% highlight java %}
data.add(new ItemData("New item"));
adapter.notifyItemInserted(data.size() - 1);
{% endhighlight %}

删除数据。

{% highlight java %}
data.remove(data.size() - 1);
adapter.notifyItemRemoved(data.size());
{% endhighlight %}

更换数据集。

{% highlight java %}
data = new ArrayList<>();
adapter.notifyDataSetChanged();
{% endhighlight %}

---

## 其他

增删动画。

{% highlight java %}
recyclerView.setItemAnimator(new DefaultItemAnimator());
{% endhighlight %}

分割线形状。

{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<shape
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle" >

    <solid android:color="@android:color/black" />
    <size android:height="5dp"/>

</shape>
{% endhighlight %}

设置分割线。

{% highlight java %}
DividerItemDecoration divider = new DividerItemDecoration(this, DividerItemDecoration.VERTICAL);
divider.setDrawable(ContextCompat.getDrawable(this, R.drawable.divider));
recyclerView.addItemDecoration(divider);
{% endhighlight %}

---
