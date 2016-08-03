#!/bin/sh
LANG=en_US;
cal_date=`date +%Y%m%d`
nginx_date_pattern=`date +%d'\'/%b'\'/%Y`
#echo $nginx_date_pattern
echo $cal_date ' Calculate Top 10 Article'
article_detail_urls = [
/newshare/629110
/detailinfo?docid=629110
/articleinfonew?dcoid=629110
/detail?docid=629110
]
awk '
BEGIN {
        count=0;
}
{
        if( $4 ~ /'$nginx_date_pattern'/ ) {
        	if( $0 ~ /'/newshare/\d+'/ || $0 ~ /'/detailinfo\?docid=\d+'/ || $0 ~ /'/articleinfonew\?docid=\d+'/ || $0 ~ /'/detail\?docid=\d+'/){
	                cal[$7]++;
	                count++;
                }
        }
        
} 
END {
        for ( item in cal ){
                print item ":" cal[item] | "sort -t \":\" -n -r -k 2";
        }

        print "PV is " count;
}' access.log |more