# _local directory

Configuration to run locally for testing.

## Installation

* <https://jekyllrb.com/docs/installation/ubuntu/>

```sh
sudo apt-get install ruby-full build-essential zlib1g-dev
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bash_aliases
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bash_aliases
source ~/.bash_aliases
gem install jekyll bundler
```

## Site Setup

Copy these repo somewhere else and:

```sh
mv _config.yml _config.ghpages.yml
cp _local/{_config.yml,Gemfile} .
```

In the site root directory:

```sh
bundle config set --local path 'vendor/bundle'
bundle add github-pages webrick
```

## Edit/View Loop

Make changes

```sh
bundle exec jekyll serve
```

Visit <http://127.0.0.1:4000/>

