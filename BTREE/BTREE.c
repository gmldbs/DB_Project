#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

#include "./BTREE.h"

void BTreeInit(int _t)
{
	root = NULL;  t = _t;
}


void traverse()
{
	if (root != NULL) _traverse(root);
}


BTreeNode* search(int k)
{
	return (root == NULL) ? NULL : _search(root, k);
}


BTreeNode* _createNode(bool _leaf)
{
	BTreeNode* newNode = (BTreeNode*)malloc(sizeof(BTreeNode));
	int i;

	// Copy the given minimum degree and leaf property
	newNode->leaf = _leaf;

	// Allocate memory for maximum number of possible keys
	// and child pointers
	newNode->keys = (int*)malloc(sizeof(int) * (t));
	newNode->C = (BTreeNode**)malloc(sizeof(BTreeNode*)*(t+1));

	// Initialize child
	for (i = 0; i < t + 1; i++)
		newNode->C[i] = NULL;

	// Initialize the number of keys as 0
	newNode->n = 0;

	// Initialize parent
	newNode->P = NULL;

	return newNode;
}

void _traverse(BTreeNode* present)
{
	// There are n keys and n+1 children, travers through n keys and first n children
	int i;
	for (i = 0; i < present->n; i++)
	{
		// If this is not leaf, then before printing key[i],
		// traverse the subtree rooted with child C[i].
		if (present->leaf == false)
			_traverse(present->C[i]);

		printf(" ");
		printf("%d", present->keys[i]);
	}

	// Print the subtree rooted with last child
	if (present->leaf == false)
		_traverse(present->C[i]);
}


BTreeNode* _search(BTreeNode* present, int k)
{
	// Find the first key greater than or equal to k
	int i = 0;
	while (i < present->n && k > present->keys[i])
		i++;

	// If the found key is equal to k, return this node
	if (present->keys[i] == k)
		return present;

	// If key is not found here and this is a leaf node
	if (present->leaf == true)
		return NULL;

	// Go to the appropriate child
	return _search(present->C[i], k);
}


void insertElement(int k)
{
	// Find key in this tree, and If there is a key, it prints error message.
	if (search(k) != NULL)
	{
		printf("The tree already has %d \n", k);
		return;
	}

	// If tree is empty
	if (root == NULL)
	{
		// Allocate memory for root
		root = _createNode(true);
		root->P = NULL; // Init parent
		root->keys[0] = k;  // Insert key
		root->n = 1;  // Update number of keys in root
	}
	else // If tree is not empty
		_insert(root, k);
}


void _insert(BTreeNode* present, int k)
{
    int len = present->n;
	if(present->leaf)
    {
        for(int i=0; i<len; i++)
        {
            if(present->keys[i]>k)
            {
                for(int j=len;;j--)
                {
                    if(j==i) break;
                    present->keys[j]=present->keys[j-1];
                }
                present->keys[i]=k;
                present->n++;
                _balancing(present);
                return;
            }
        }
        present->keys[len]=k;
        present->n++;
        _balancing(present);
        return;
    }
    else
    {
        for(int i=0; i<len; i++)
        {
            if(present->keys[i]>k)
            {
                _insert(present->C[i],k);
                return;
            }
        }
        _insert(present->C[len],k);
        return;
    }
}

void _balancing(BTreeNode* present)
{
	BTreeNode* parent;

    if (present->n < t)
    {
        return;
    }
    else if (present->P == NULL)
    {
        
        root = _splitChild(present);
        return;
    }
    else
    {
        parent = _splitChild(present);
        _balancing(parent);
    }
}

BTreeNode* _splitChild(BTreeNode* present)
{
    BTreeNode* parent;
    
    parent = present->P;
    BTreeNode* left = _createNode(present->leaf);
    BTreeNode* right = _createNode(present->leaf);
    int idx_c;
    if((present->n)%2 == 0) idx_c = (present->n)/2 - 1;
    else idx_c = (present->n)/2;
    for(int i=0;i<idx_c;i++)
    {
        left->keys[i]=present->keys[i];
        left->n++;
    }
    for(int i=0;i<=idx_c;i++)
    {
        left->C[i]=present->C[i];
        if(present->C[i]!=NULL) present->C[i]->P=left;
    }
    
    for(int i=idx_c+1;i<present->n;i++)
    {
        right->keys[i-idx_c-1]=present->keys[i];
        right->n++;
    }
    for(int i=idx_c+1;i<present->n+1;i++)
    {
        right->C[i-idx_c-1] = present->C[i];
        if(present->C[i]!=NULL) {
            right->C[i-idx_c-1]->P=right;
            present->C[i]->P=right;
        }
    }
    if(parent==NULL)
    {
        BTreeNode* new = _createNode(false);
        new->P=NULL;
        new->keys[0]=present->keys[idx_c];
        new->n=1;
        new->C[0]=left;
        new->C[1]=right;
        left->P=new;
        right->P=new;
        root=new;
        return new;
    }
    else
    {
        int idx=0;
        for(int i=0;i<=parent->n;i++)
        {
            if(parent->C[i]==present)
            {
                idx=i;
                break;
            }
        }
        for(int i=parent->n;;i--)
        {
            if(i==idx) break;
            parent->keys[i]=parent->keys[i-1];
        }
        for(int i=parent->n+1;;i--)
        {
            if(i==idx) break;
            parent->C[i]=parent->C[i-1];
        }
        parent->keys[idx]=present->keys[idx_c];
        parent->n++;
        parent->C[idx]=left;
        parent->C[idx+1]=right;
        right->P=parent;
        left->P=parent;
        
        return parent;
    }
}

BTreeNode* getpred(BTreeNode* present)
{
    if(present->leaf == false) return getpred(present->C[present->n]);
    else return present;
}

BTreeNode* getSucc(BTreeNode* present)
{
    if(present->leaf == false) return getSucc(present->C[0]);
    else return present;
}
void removeElement(int k)
{
	if (!root)
	{
		printf("The tree is empty\n");
		return;
	}

	// Call the remove function for root
	//_remove(root, k);

    BTreeNode* target = search(k);
    if(target==NULL)
    {
        printf("Cannot find input value in BTree.\n");
        printf("Delete Fault.\n");
        return;
    }
    else
    {
        _remove(target,k);
    }
	// If the root node has 0 keys, make its first child as the new root
	//  if it has a child, otherwise set root as NULL
	if (root->n == 0)
	{
		BTreeNode *tmp = root;
		if (root->leaf)
		{
			root = NULL;
		}
		else
		{
			root = root->C[0];
			root->P = NULL;
		}

		// Free the old root
		free(tmp);
	}
	return;
}

void _remove(BTreeNode* present, int k)
{
    int minKeys, idx;
    minKeys=t/2;
    
    for(int i=0;i<present->n;i++)
    {
        if(present->keys[i]==k) {
            idx=i;
            break;
        }
    }
    
    if(present->leaf)
    {
        for(int i=idx;i<present->n-1;i++)
            present->keys[i]=present->keys[i+1];
        present->n--;
        _balancingAfterDel(present);
        return;
    }
    else
    {
        BTreeNode* temp = getpred(present->C[idx]);
        int tmp=temp->keys[temp->n-1]; //pred value = tmp
        temp->keys[temp->n-1]=present->keys[idx];
        present->keys[idx]=tmp;
        _remove(temp,temp->keys[temp->n-1]);
    }
}

void _balancingAfterDel(BTreeNode* present) // repair After Delete
{
    int minKeys = (t+1)/2 - 1;
	BTreeNode* parent;
	BTreeNode* next;
	int parentIndex = 0;

	if (present->n < minKeys)
	{
		if (present->P == NULL)
		{
			if (present->n == 0)
			{
				root = present->C[0];
				if (root != NULL)
					root->P = NULL;
			}
		}
		else
		{
			parent = present->P;
			for (parentIndex = 0; parent->C[parentIndex] != present; parentIndex++) ;
			if (parentIndex > 0 && parent->C[parentIndex - 1]->n > minKeys)
			{
				_borrowFromLeft(present, parentIndex);
			}
			else if (parentIndex < parent->n && parent->C[parentIndex + 1]->n > minKeys)
			{
				_borrowFromRight(present, parentIndex);
			}
			else if (parentIndex == 0)
			{
				// Merge with right sibling
				next = _merge(parent,parentIndex);
				_balancingAfterDel(next->P);
			}
			else
			{
				// Merge with left sibling
				next = _merge(parent, parentIndex-1);
				_balancingAfterDel(next->P);
			}
		}
	}
}


void _borrowFromRight(BTreeNode* present, int parentIdx)
{
    BTreeNode* neigh = present->P->C[parentIdx+1];
    present->keys[present->n]=present->P->keys[parentIdx];
    present->n++;
    
    present->P->keys[parentIdx]=neigh->keys[0];
    present->C[present->n] = neigh->C[0];
    neigh->C[0]->P=present;
    
    neigh->n--;
    for(int i=0;i<neigh->n;i++)
    {
        neigh->keys[i]=neigh->keys[i+1];
    }
    for(int i=0;i<neigh->n+1;i++)
    {
        neigh->C[i]=neigh->C[i+1];
    }
}


void _borrowFromLeft(BTreeNode* present, int parentIdx)
{
    
	BTreeNode* neigh = present->P->C[parentIdx-1];
    //present->keys[present->n]=present->P->keys[parentIdx-1];
    for(int i=present->n;i>0;i--)
    {
        present->keys[i]=present->keys[i-1];
    }
    for(int i=present->n+1;i>0;i--)
    {
        present->C[i]=present->C[i-1];
    }
    present->n++;
    present->keys[0]=present->P->keys[parentIdx-1];
    present->C[0]=neigh->C[neigh->n];
    present->P->keys[parentIdx-1]=neigh->keys[neigh->n-1];
    neigh->n--;
}


BTreeNode* _merge(BTreeNode* parent, int idx_p)
{
    BTreeNode* left = parent->C[idx_p];
    BTreeNode* right = parent->C[idx_p+1];
    left->keys[left->n]=parent->keys[idx_p];
    left->n++;
    for(int i=0;i<right->n;i++)
    {
        left->keys[left->n+i]=right->keys[i];
    }
    for(int i=0;i<right->n+1;i++)
    {
        left->C[left->n+i]=right->C[i];
        if(right->C[i]!=NULL) right->C[i]->P=left;
    }
    left->n+=right->n;
    free(right);
    
    parent->n--;
    for(int i=idx_p;i<parent->n;i++)
    {
        parent->keys[i]=parent->keys[i+1];
    }
    for(int i=idx_p+1;i<parent->n+1;i++)
    {
        parent->C[i]=parent->C[i+1];
    }
    return left;
}

int _getLevel(BTreeNode* present)
{
	int i;
	int maxLevel = 0;
	int temp;
	if (present == NULL) return maxLevel;
	if (present->leaf == true)
		return maxLevel + 1;

	for (i = 0; i < present->n + 1; i++)
	{
		temp = _getLevel(present->C[i]);

		if (temp > maxLevel)
			maxLevel = temp;
	}

	return maxLevel + 1;
}

void _getNumberOfNodes(BTreeNode* present, int* numNodes, int level)
{
	int i;
	if (present == NULL) return;

	if (present->leaf == false)
	{
		for (i = 0; i < present->n + 1; i++)
			_getNumberOfNodes(present->C[i], numNodes, level + 1);
	}
	numNodes[level] += 1;
}

void _mappingNodes(BTreeNode* present, BTreeNode ***nodePtr, int* numNodes, int level)
{
	int i;
	if (present == NULL) return;

	if (present->leaf == false)
	{
		for (i = 0; i < present->n + 1; i++)
			_mappingNodes(present->C[i], nodePtr, numNodes, level + 1);
	}

	nodePtr[level][numNodes[level]] = present;
	numNodes[level] += 1;
}


void printTree()
{
	int level;
	int *numNodes;
	int i, j, k;

	level = _getLevel(root);
	numNodes = (int *)malloc(sizeof(int) * (level));
	memset(numNodes, 0, level * sizeof(int));

	_getNumberOfNodes(root, numNodes, 0);

	BTreeNode ***nodePtr;
	nodePtr = (BTreeNode***)malloc(sizeof(BTreeNode**) * level);
	for (i = 0; i < level; i++) {
		nodePtr[i] = (BTreeNode**)malloc(sizeof(BTreeNode*) * numNodes[i]);
	}

	memset(numNodes, 0, level * sizeof(int));
	_mappingNodes(root, nodePtr, numNodes, 0);

	for (i = 0; i < level; i++) {
		for (j = 0; j < numNodes[i]; j++) {
			printf("[");

			for (k = 0; k < nodePtr[i][j]->n; k++)
				printf("%d ", nodePtr[i][j]->keys[k]);

			printf("] ");
		}
		printf("\n");
	}

	for (i = 0; i < level; i++) {
		free(nodePtr[i]);
	}
	free(nodePtr);
}
